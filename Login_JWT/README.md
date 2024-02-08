# Login_JWT

## CTF 02072024

Time: Wednesday, February 7th 2024

Location:  Baldur's Gate 3 - Act 3

Just login and see What happens with some Tampering



### Client

```sh
cd client
docker build -t login_jwt_client .
```

### Server
```sh
cd server
docker build -t login_jwt_server .
```


### Docker-Compose

```sh
docker compose up
```

If you want to rebuild the images after some changes:
```sh
docker compose up --build
```

#### Tear down
```sh
docker compose down
```


### Running the combined docker image
If you want the simplicity of just deploying one container that has both client and server.  This also works around Cross-Origin Resource Sharing (CORS) without having an allow list for other domains or subdomains.

Could also have the ExpressJS server host the client as well as server.
```sh
docker run -p 80:80 -p 3000:3000 --name client_server login_jwt
```


### Hosting

#### Azure

These are useful settings:
```sh
[
  {
    "name": "DOCKER_ENABLE_CI",
    "value": "true",
    "slotSetting": false
  },
  {
    "name": "FLAG",
    "value": "YOUR_FLAG",
    "slotSetting": false
  },
  {
    "name": "NODE_ENV",
    "value": "production",
    "slotSetting": false
  },
  {
    "name": "SECRET_KEY",
    "value": "YOUR_SECRET_KEY",
    "slotSetting": false
  },
  {
    "name": "WEBSITES_CONTAINER_START_TIME_LIMIT",
    "value": "1",
    "slotSetting": false
  }
]
```

Azure will only allow you to expose one port (default 80 and 443).  It can be set explicitly with this configuration/App Settings:
```sh
WEBSITES_PORT=3000
```

### Secret Key Generation

Script for generating possible wordlist.
```python
from itertools import product

input_string = "Some string you want to basic l333t!"

def leet_replace(char):
    leet_dict = {'a': ['a', '4'], 'e': ['e', '3'], 'i': ['i', '1'], 'o': ['o', '0'], 's': ['s', '5']}
    return leet_dict.get(char, [char])

# Generate leet variations of the characters
leet_variations = [''.join(leet_replace(char)) for char in input_string.lower()]

# Generate all combinations of the leet variations
all_combinations = [''.join(combination) for combination in product(*leet_variations)]

print(len(all_combinations))

# Print the generated combinations
for combination in all_combinations:
    print(combination)
```
