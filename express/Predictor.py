from pandas import read_csv, to_datetime, DataFrame, read_json
from fbprophet import Prophet
from matplotlib import pyplot
from sklearn.metrics import mean_absolute_error, accuracy_score
import csv, requests, sys, json, os 
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


def grabsales():
    r = requests.get("http://localhost:5000/api/sales")
    data = r.json()
    # print(data)
    return data["express"]

meow = []
for i in grabsales():
    date = dp.parse(i["ProductActivity__createdAt"])
    date = date.strftime('%s')
    meow.append([date, i["ProductActivity__localAmount"], i["ProductActivity__shoeSize"]])
# print(meow)

def grabseries():
    r = requests.get("http://localhost:5000/api/series")
    data = r.json()["series"]
    return data

def filterarr(size, arr):
    if size == 0:
        return arr
    new = []
    size = str(size)
    for x in arr: 
        if x[2] == size:
            new.append(x)
    return new

def jsonpredict(size):
    filtered = filterarr(size, meow)
    df = DataFrame.from_records(filtered)
    df.columns = ['ds', 'y', 'sz']
    df['ds'] = to_datetime(df['ds'], unit = 'ms')
    # print(len(df))
    model = Prophet()
    # print(df)
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
    # print(forecast[['ds', 'yhat', 'yhat_lower', 'yhat_upper']].head())
    # print(forecast[['ds', 'yhat', 'yhat_lower', 'yhat_upper']]
    yTrue = []
    for x in range(50):
        yTrue.append(df['y'][len(df) - 50 + x])
    # print(yTrue)
    yPred = []
    for i in range (len(forecast)):
        yPred.append(round(forecast['yhat'][i]))
    # print(yPred)
    # print("Mean Absolute Error:",mean_absolute_error(y_true=yTrue, y_pred=forecast['yhat']),'%')
    # plot forecast
    # model.plot(forecast)
    print(forecast.to_json())
    # print(forecast[['ds', 'yhat', 'yhat_lower', 'yhat_upper']].head())
    # print("actual: ",yTrue)
    # print("pred: ", yPred)
    # print("Mean Absolute Error:",mean_absolute_error(y_true=yTrue, y_pred=forecast['yhat']),'%')
    # pyplot.show()


# def inSample(path):
#     # load data
    # df = read_csv(path)
#     # prepare expected column names
#     df.columns = ['ds', 'y']
#     df['ds']= to_datetime(df['ds'], unit = 'ms')
#     # define the model
#     model = Prophet()
#     # fit the model
#     model.fit(df)
#     # define the period for which we want a prediction
#     future = list()
#     for x in range(10):
#         future.append(df['ds'][88 + x])
#     future = DataFrame(future)
#     future.columns = ['ds']
#     future['ds']= to_datetime(future['ds'])
#     # use the model to make a forecast
#     forecast = model.predict(future)
#     # summarize the forecast
#     print(forecast[['ds', 'yhat', 'yhat_lower', 'yhat_upper']].head())
#     yTrue = []
#     for x in range(10):
#         yTrue.append(df['y'][88 + x])
#     print(yTrue)
#     yPred = []
#     for i in range (len(forecast)):
#         yPred.append(round(forecast['yhat'][i]))
#     print(yPred)
#     print("Mean Absolute Error:",mean_absolute_error(y_true=yTrue, y_pred=forecast['yhat']),'%')
#     # plot forecast
#     model.plot(forecast)
#     pyplot.show()

# def outSample(path):
#     # evaluate prophet time series forecasting model on hold out dataset
#     # load data
#     df = read_csv(path)
#     # prepare expected column names
#     df.columns = ['ds', 'y']
#     df['ds']= to_datetime(df['ds'], unit = 'ms')
#     # create test dataset, remove last 12 months
#     train = df.drop(df.index[-12:])
#     print(train.tail())
#     # define the model
#     model = Prophet()
#     # fit the model
#     model.fit(train)
#     # define the period for which we want a prediction
#     future = list()
#     for x in range(98):
#         future.append(df['ds'][x])
#     future = DataFrame(future)
#     future.columns = ['ds']
#     future['ds'] = to_datetime(future['ds'])
#     # use the model to make a forecast
#     forecast = model.predict(future)
#     # calculate MAE between expected and predicted values for december
#     y_true = df['y'][-12:].values
#     y_pred = forecast['yhat'].values
#     # mae = mean_absolute_error(y_true, y_pred)
#     # print('MAE: %.3f' % mae)
#     # plot expected vs actual
#     pyplot.plot(y_true, label='Actual')
#     pyplot.plot(y_pred, label='Predicted')
#     pyplot.legend()
#     pyplot.show()

jsonpredict(10)
sys.stdout.flush()

