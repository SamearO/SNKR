import os, json, sqlite3, pandas, csv, requests

path = '/Users/samir/Documents/A-Level/Computer Science A-Level/Coursework/Project/Initial Testing/test2/express/stockx.db'
conn = sqlite3.connect(path)
c = conn.cursor()

def getdata():
    with conn:
        c.execute("SELECT * FROM ProductActivity")
        return (c.fetchall())

path_to_json = '/Users/samir/Documents/A-Level/Computer Science A-Level/Coursework/Project/Initial Testing/test2/express/testdata.json'

def grabLocal():
    with open(path_to_json) as f:
        data = json.load(f)
        return data['ProductActivity']

# def csvinsert():
#     myjson = grabLocal()[0]
#     # for x in range(len(grabLocal()) -1) :
#     #     print(grabLocal()[x])
#     df = pandas.read_json (r'/Users/samir/Documents/A-Level/Computer Science A-Level/Coursework/Project/Initial Testing/test2/express\testdata.json')
#     # df.to_csv (r'/Users/samir/Documents/A-Level/Computer Science A-Level/Coursework/Project/Initial Testing/test2/express\local.csv', index = None)
#     print("JSON data converted to CSV")
#     print(df)

url = "https://stockx.com/api/products/af8ae222-4eff-4a2d-b674-c3592efa5252/activity?state=480&currency=GBP&limit=1000&page=1&sort=createdAt&order=DESC&country=GB"
headers = {"user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.135 Safari/537.36"
}
response = requests.get(url=url, headers=headers)
print(response)
# mydata = json.load(requests.get(url=url, headers=headers)

# csvinsert()
# def formatjson():
#     ranger = len(mydata)
#     for x in range(ranger):
#         mydata["ProductActivity"][x] == "null"
#     return mydata 

# mydata = json.load("./testdata.json")
# print(len(mydata))

averagedata = [
        [
          1517712248000,
          323
        ],
        [
          1518542429780,
          220
        ],
        [
          1519372611560,
          215
        ],
        [
          1520202793340,
          216
        ],
        [
          1521032975120,
          210
        ],
        [
          1521863156900,
          210
        ],
        [
          1522693338680,
          209
        ],
        [
          1523523520460,
          213
        ],
        [
          1524353702240,
          221
        ],
        [
          1525183884020,
          215
        ],
        [
          1526014065800,
          214
        ],
        [
          1526844247580,
          209
        ],
        [
          1527674429360,
          200
        ],
        [
          1528504611140,
          204
        ],
        [
          1529334792920,
          199
        ],
        [
          1530164974700,
          192
        ],
        [
          1530995156480,
          199
        ],
        [
          1531825338260,
          206
        ],
        [
          1532655520040,
          216
        ],
        [
          1533485701820,
          233
        ],
        [
          1534315883600,
          236
        ],
        [
          1535146065380,
          234
        ],
        [
          1535976247160,
          237
        ],
        [
          1536806428940,
          239
        ],
        [
          1537636610720,
          244
        ],
        [
          1538466792500,
          244
        ],
        [
          1539296974280,
          242
        ],
        [
          1540127156060,
          248
        ],
        [
          1540957337840,
          235
        ],
        [
          1541787519620,
          240
        ],
        [
          1542617701400,
          240
        ],
        [
          1543447883180,
          240
        ],
        [
          1544278064960,
          245
        ],
        [
          1545108246740,
          247
        ],
        [
          1545938428520,
          253
        ],
        [
          1546768610300,
          252
        ],
        [
          1547598792080,
          254
        ],
        [
          1548428973860,
          255
        ],
        [
          1549259155640,
          254
        ],
        [
          1550089337420,
          273
        ],
        [
          1550919519200,
          279
        ],
        [
          1551749700980,
          292
        ],
        [
          1552579882760,
          285
        ],
        [
          1553410064540,
          283
        ],
        [
          1554240246320,
          288
        ],
        [
          1555070428100,
          294
        ],
        [
          1555900609880,
          290
        ],
        [
          1556730791660,
          296
        ],
        [
          1557560973440,
          292
        ],
        [
          1558391155220,
          283
        ],
        [
          1559221337000,
          281
        ],
        [
          1560051518780,
          271
        ],
        [
          1560881700560,
          281
        ],
        [
          1561711882340,
          291
        ],
        [
          1562542064120,
          282
        ],
        [
          1563372245900,
          274
        ],
        [
          1564202427680,
          278
        ],
        [
          1565032609460,
          290
        ],
        [
          1565862791240,
          309
        ],
        [
          1566692973020,
          328
        ],
        [
          1567523154800,
          307
        ],
        [
          1568353336580,
          306
        ],
        [
          1569183518360,
          302
        ],
        [
          1570013700140,
          299
        ],
        [
          1570843881920,
          297
        ],
        [
          1571674063700,
          293
        ],
        [
          1572504245480,
          296
        ],
        [
          1573334427260,
          301
        ],
        [
          1574164609040,
          309
        ],
        [
          1574994790820,
          312
        ],
        [
          1575824972600,
          320
        ],
        [
          1576655154380,
          331
        ],
        [
          1577485336160,
          344
        ],
        [
          1578315517940,
          328
        ],
        [
          1579145699720,
          321
        ],
        [
          1579975881500,
          336
        ],
        [
          1580806063280,
          343
        ],
        [
          1581636245060,
          343
        ],
        [
          1582466426840,
          343
        ],
        [
          1583296608620,
          361
        ],
        [
          1584126790400,
          342
        ],
        [
          1584956972180,
          334
        ],
        [
          1585787153960,
          343
        ],
        [
          1586617335740,
          356
        ],
        [
          1587447517520,
          378
        ],
        [
          1588277699300,
          398
        ],
        [
          1589107881080,
          460
        ],
        [
          1589938062860,
          467
        ],
        [
          1590768244640,
          450
        ],
        [
          1591598426420,
          462
        ],
        [
          1592428608200,
          467
        ],
        [
          1593258789980,
          484
        ],
        [
          1594088971760,
          491
        ],
        [
          1594919153540,
          518
        ],
        [
          1595749335320,
          520
        ],
        [
          1596579517100,
          533
        ],
        [
          1597409698880,
          534
        ],
        [
          1598239880660,
          526
        ],
        [
          1599070062440,
          528
        ],
        [
          1599900244220,
          506
        ]
      ]

# def csvinsert():
#     fname = "local.csv"
#     # thisdata = formatjson()
#     with open(fname, "w") as file:
#         csv_file = csv.writer(file)
#         csv_file.writerow(["date", "price"])
#         for item in thisdata:
#             csv_file.writerow([thisdata[item]["createdAt"], thisdata[item]["localAmount"]])
#             print("item ", item, "added")

def csvinsert2():
    fname = "local.csv"
    with open(fname, "w") as file:
        csv_file = csv.writer(file)
        csv_file.writerow(["Date", "Price"])
        for x in range (len(averagedata) -1):
            csv_file.writerow([averagedata[x][0], averagedata[x][1]])
            print("item", x, "added")
        
csvinsert2()

