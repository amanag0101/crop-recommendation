import requests
import json

url = 'http://127.0.0.1:5000/crop'
data = {
    'N': 10,
    'P': 20,
    'K': 30,
    'Ph': 6.5,
    'state': 'Tamil Nadu',
    'district': 'Katpadi',
    'start_month': 1,
    'end_month': 12
}
headers = {'Content-type': 'application/json'}

response = requests.post(url, data=json.dumps(data), headers=headers)
print(response.json())
