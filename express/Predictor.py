from pandas import read_csv, to_datetime, DataFrame, read_json
from fbprophet import Prophet
from matplotlib import pyplot
from sklearn.metrics import mean_absolute_error, accuracy_score
import csv, requests, sys, json, os, time
import dateutil.parser as dp

class suppress_stdout_stderr(object):
    '''
    A context manager for doing a "deep suppression" of stdout and stderr in
    Python, i.e. will suppress all print, even if the print originates in a
    compiled C/Fortran sub-function.
       This will not suppress raised exceptions, since exceptions are printed
    to stderr just before a script exits, and after the context manager has
    exited (at least, I think that is why it lets exceptions through).

    '''
    def __init__(self):
        # Open a pair of null files
        self.null_fds = [os.open(os.devnull, os.O_RDWR) for x in range(2)]
        # Save the actual stdout (1) and stderr (2) file descriptors.
        self.save_fds = [os.dup(1), os.dup(2)]

    def __enter__(self):
        # Assign the null pointers to stdout and stderr.
        os.dup2(self.null_fds[0], 1)
        os.dup2(self.null_fds[1], 2)

    def __exit__(self, *_):
        # Re-assign the real stdout/stderr back to (1) and (2)
        os.dup2(self.save_fds[0], 1)
        os.dup2(self.save_fds[1], 2)
        # Close the null files
        for fd in self.null_fds + self.save_fds:
            os.close(fd)

# returns sales from mym api
def grabsales():
    r = requests.get("http://localhost:5000/api/sales")
    data = r.json()
    # print(data)
    return data["express"]

# returns a r record of sales with their respective parsed dates
def predictorRecord():
    arr = []
    for i in grabsales():
        # date = dp.parse(i["ProductActivity__createdAt"])
        # date = date.strftime('%S')
        date = (i["ProductActivity__createdAt"])[:-6]
        arr.append([date, i["ProductActivity__localAmount"], i["ProductActivity__shoeSize"]])
    return arr

# returns data from the series endpoint 
def grabseries():
    r = requests.get("http://localhost:5000/api/series")
    data = r.json()["series"]
    return data

# returns an an array of filtered sales ny size
def filterarr(size, arr):
    if size == 0:
        return arr
    new = []
    size = str(size)
    for x in arr: 
        if x[2] == size:
            new.append(x)
    return new

# returns the uuid of a particular size
def findsz(arr, sz):
    for i in range(len(arr) -1):
        if arr[i].size == sz:
            return arr[i].uuid


def grabProductInfo(product, size):
    headers = {
      "user-agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.111 Safari/537.36",
        "sec-fetch-dest": "none",
        "accept": "*/*",
        "sec-fetch-site": "cross-site",
        "sec-fetch-mode": "cors",
        "accept-language": "en-US",
    }
    url = "https://stockx.com/api/products/air-jordan-1-retro-high-bred-toe?includes=market&currency=GBP"
    r = requests.get(url = product, headers = headers)
    data = r.json()
    variants = data["Product"]["children"]
    variantArray = []
    for key in variants:
        variantArray.append({"size" : variants[key].shoeSize, "uuid" : key, "market" : variants[key].market})
    print("Product Parsed: ",{
        "name" : data["Product"].title,
        "image" : data["Product"].media.imageUrl,
        "urlKey" : data["Product"].urlKey,
        "pid" : data["Product"].styleId,
        "uuid" : data["Product"].uuid,
        "marketData" : data["Product"].market,
        "variants" : variantArray,
    })
    sizeid = findsz(variantArray, size)
    return sizeid

def newjsonpredict(size, info):
    filtered = filterarr(size, predictorRecord())
    # print(dp.parser.parse(filtered[0][0]))
    print(filtered)
    df = DataFrame.from_records(filtered)
    df.columns = ['ds', 'y', 'sz']
    df['ds'] = to_datetime(df['ds'])
    model = Prophet(yearly_seasonality=True)
    with suppress_stdout_stderr():
        model.fit(df)

    # define the period for which we want a prediction
    future = list()
    for x in range(50):
        future.append(df['ds'][len(df) - 50 + x])
    future = DataFrame(future)
    future.columns = ['ds']
    future['ds']= to_datetime(future['ds'], unit = 'ms')

    # use the model to make a forecast
    forecast = model.predict(future)

    # summarize the forecast
    if(info):
        print(forecast[['ds', 'yhat', 'yhat_lower', 'yhat_upper']].head())
        print(forecast[['ds', 'yhat', 'yhat_lower', 'yhat_upper']].head())
        
    yTrue = []
    for x in range(50):
        yTrue.append(df['y'][len(df) - 50 + x])
    yPred = []
    for i in range (len(forecast)):
        yPred.append(round(forecast['yhat'][i]))

    # plot forecast
    model.plot(forecast)
    if(info):
        print("actual: ",yTrue)
        print("pred: ", yPred)
        print("Mean Absolute Error: ",mean_absolute_error(y_true=yTrue, y_pred=forecast['yhat']),'%')
        pyplot.show()

    print(forecast.to_json())


def jsonpredict(size, info):
    json = grabseries()
    df = DataFrame.from_dict(json)
    df.columns = ['id', 'ds', 'y']
    # print(df['ds'][0])
    df['ds'] = to_datetime(df['ds'], unit = 'ms')
    # print(df['ds'][0])
    model = Prophet(yearly_seasonality=True)
    # print(df)
    with suppress_stdout_stderr():
        model.fit(df)
    # define the period for which we want a prediction
    future = list()
    for x in range(10):
        future.append(df['ds'][len(json) - 10 + x])
    future = DataFrame(future)
    future.columns = ['ds']
    future['ds']= to_datetime(future['ds'], unit = 'ms')
    # use the model to make a forecast
    forecast = model.predict(future)
    # summarize the forecast
    # print(forecast[['ds', 'yhat', 'yhat_lower', 'yhat_upper']]
    yTrue = []
    for x in range(10):
        yTrue.append(df['y'][len(json) - 10 + x])
    # print(yTrue)
    yPred = []
    for i in range (len(forecast)):
        yPred.append(round(forecast['yhat'][i]))
    if(info):
        print(forecast[['ds', 'yhat', 'yhat_lower', 'yhat_upper']].head())
        print("Actual: ", yTrue)
        print("Predicted: ", yPred)
        pyplot.show()
    print(forecast.to_json())

def inSample(path):
    # load data
    df = read_csv(path)
    # prepare expected column names
    df.columns = ['ds', 'y']
    df['ds']= to_datetime(df['ds'], unit = 'ms')
    # define the model
    model = Prophet()
    # fit the model
    model.fit(df)
    # define the period for which we want a prediction
    future = list()
    for x in range(10):
        future.append(df['ds'][88 + x])
    future = DataFrame(future)
    future.columns = ['ds']
    future['ds']= to_datetime(future['ds'])
    # use the model to make a forecast
    forecast = model.predict(future)
    # summarize the forecast
    print(forecast[['ds', 'yhat', 'yhat_lower', 'yhat_upper']].head())
    yTrue = []
    for x in range(10):
        yTrue.append(df['y'][88 + x])
    print(yTrue)
    yPred = []
    for i in range (len(forecast)):
        yPred.append(round(forecast['yhat'][i]))
    print(yPred)
    print("Mean Absolute Error:",mean_absolute_error(y_true=yTrue, y_pred=forecast['yhat']),'%')
    # plot forecast
    model.plot(forecast)
    pyplot.show()

def outSample(path):
    # evaluate prophet time series forecasting model on hold out dataset
    # load data
    df = read_csv(path)
    # prepare expected column names
    df.columns = ['ds', 'y']
    df['ds']= to_datetime(df['ds'], unit = 'ms')
    # create test dataset, remove last 12 months
    train = df.drop(df.index[-12:])
    print(train.tail())
    # define the model
    model = Prophet()
    # fit the model
    model.fit(train)
    # define the period for which we want a prediction
    future = list()
    for x in range(98):
        future.append(df['ds'][x])
    future = DataFrame(future)
    future.columns = ['ds']
    future['ds'] = to_datetime(future['ds'])
    # use the model to make a forecast
    forecast = model.predict(future)
    # calculate MAE between expected and predicted values for december
    y_true = df['y'][-12:].values
    y_pred = forecast['yhat'].values
    # mae = mean_absolute_error(y_true, y_pred)
    # print('MAE: %.3f' % mae)
    # plot expected vs actual
    pyplot.plot(y_true, label='Actual')
    pyplot.plot(y_pred, label='Predicted')
    pyplot.legend()
    pyplot.show()

# print("non-filtered:", predictorRecord())
# print("filtered:", filterarr(8, predictorRecord()))

# newjsonpredict(9, True)
jsonpredict(int((sys.stdin.readlines())), False)
# jsonpredict(9, False)

# grabProductInfo("https://stockx.com/air-jordan-1-retro-high-bred-toe", "11")
sys.stdout.flush()

headers = {
    "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.111 Safari/537.36"}
# r = requests.get(url = "https://stockx.com/api/products/air-jordan-1-retro-high-bred-toe?includes=market&currency=GBP", headers = headers)
# print(r.status_code)
# data = r.json()
# print(data)

# def handleException(url, headers):
#     try: 
#         r = requests.get(url, headers)
#         return r.text
#     except ConnectionError or ConnectionResetError or ConnectionAbortedError or ConnectionRefusedError:
#         time.sleep(1)
#         print("ABORTED")
#         # handleException(url, headers)
        
# print(handleException("https://stockx.com/api/products/air-jordan-1-retro-high-bred-toe?includes=market&currency=GBP", headers))
