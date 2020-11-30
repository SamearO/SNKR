import requests, json

def grabsales():
    r = requests.get("http://localhost:5000/api/sales")
    data = r.json()
    # print(data)
    return data["express"]

# meow = dict()
# for i in grabsales():
#     meow[] = ([i["ProductActivity__createdAt"], i["ProductActivity__localAmount"], i["ProductActivity__shoeSize"]])
# print(meow)

# print(grabsales()[0])

# def filterjson(input, keys, counter):
#     if(counter == len(keys) -1):
#         return json.loads(input)
#     else:
#         # Transform json input to python objects
#         input_dict = json.loads(input)
#         # Filter python objects with list comprehensions
#         output_dict = [x for x in input_dict["express"] if x[0][counter]["ProductActivity__localAmount"]] == 1
#         filterjson(output_dict, keys, counter + 1)

# yee = ["ProductActivity__chainId", "ProductActivity__localCurrency", "ProductActivity__state"]
# print(filterjson(grabsales(), yee, 0))
# print(grabseries())