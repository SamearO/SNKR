from pandas import read_csv
from pandas import to_datetime
from pandas import DataFrame
from fbprophet import Prophet
from matplotlib import pyplot
from sklearn.metrics import mean_absolute_error
import csv

def alterdates(path):
    df = read_csv(path)
    with open(path, 'r') as file:
        data = [row for row in csv.reader(path)]
        for x in range(len(df["Date"])):
            newdate = to_datetime(data[0][x])
            file.set_value(x, "Date", newdate)
            print("date", x, "altered")
    file.close()
    df = read_csv(path)
    # for x in range(len(df["Date"]) -1 ):
    #     newdate = to_datetime(df["Date"][x])
    #     df.set_value(x, "Date", newdate)
    #     print("date", x, "altered")
    print(df.head(3))


def inSample(path):
    # load data
    df = read_csv(path)
    alterdates(path)
    # prepare expected column names
    df.columns = ['ds', 'y']
    df['ds']= to_datetime(df['ds'])
    # define the model
    model = Prophet()
    # fit the model
    model.fit(df)
    # define the period for which we want a prediction
    future = list()
    for i in range(1, 13):
        date = '1968-%02d' % i
        future.append([date])
    future = DataFrame(future)
    future.columns = ['ds']
    future['ds']= to_datetime(future['ds'])
    # use the model to make a forecast
    forecast = model.predict(future)
    # summarize the forecast
    print(forecast[['ds', 'yhat', 'yhat_lower', 'yhat_upper']].head())
    # plot forecast
    model.plot(forecast)
    pyplot.show()

def outSample(path):
    # evaluate prophet time series forecasting model on hold out dataset
    # load data
    df = read_csv(path)
    # prepare expected column names
    df.columns = ['ds', 'y']
    df['ds']= to_datetime(df['ds'])
    # create test dataset, remove last 12 months
    train = df.drop(df.index[-12:])
    print(train.tail())
    # define the model
    model = Prophet()
    # fit the model
    model.fit(train)
    # define the period for which we want a prediction
    future = list()
    for i in range(1, 13):
        date = '1968-%02d' % i
        future.append([date])
    future = DataFrame(future)
    future.columns = ['ds']
    future['ds'] = to_datetime(future['ds'])
    # use the model to make a forecast
    forecast = model.predict(future)
    # calculate MAE between expected and predicted values for december
    y_true = df['y'][-12:].values
    y_pred = forecast['yhat'].values
    mae = mean_absolute_error(y_true, y_pred)
    print('MAE: %.3f' % mae)
    # plot expected vs actual
    pyplot.plot(y_true, label='Actual')
    pyplot.plot(y_pred, label='Predicted')
    pyplot.legend()
    pyplot.show()

def testy(path):
    # load data
    df = read_csv(path)
    alterdates(path)
    # plot the time series
    df.plot()
    pyplot.show()


path = 'https://raw.githubusercontent.com/jbrownlee/Datasets/master/monthly-car-sales.csv'
path2 = '/Users/samir/Documents/A-Level/Computer Science A-Level/Coursework/Project/Initial Testing/test2/express/local.csv'
# inSample("local.csv")
# testy("local.csv")
alterdates("local.csv")
# outSample(path)
