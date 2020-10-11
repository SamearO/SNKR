from pandas import read_csv, to_datetime, DataFrame, read_json
from fbprophet import Prophet
from matplotlib import pyplot
from sklearn.metrics import mean_absolute_error, accuracy_score
import csv, requests
import sys

def grabseries():
    r = requests.get("http://localhost:5000/api/series")
    data = r.json()["series"]
    return data

def jsonpredict():
    json = grabseries()
    df = DataFrame.from_dict(json)
    df.columns = ['id', 'ds', 'y']
    df['ds'] = to_datetime(df['ds'], unit = 'ms')
    model = Prophet()
    print(df)
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
    print(forecast[['ds', 'yhat', 'yhat_lower', 'yhat_upper']].head())
    yTrue = []
    for x in range(10):
        yTrue.append(df['y'][len(json) - 10 + x])
    print(yTrue)
    yPred = []
    for i in range (len(forecast)):
        yPred.append(round(forecast['yhat'][i]))
    print(yPred)
    print("Mean Absolute Error:",mean_absolute_error(y_true=yTrue, y_pred=forecast['yhat']),'%')
    # plot forecast
    model.plot(forecast)
    pyplot.show()


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

jsonpredict()
# inSample("local.csv")

