
url="https://5293d840trial.authentication.us10.hana.ondemand.com/oauth/token"
client_id="sb-e91a83ba-5bda-4ddb-b4b8-3a259313a3e4!b308780|xsuaa!b49390"
client_secret="9fe092e2-e87f-4caa-9643-981470e61614$GfAR6cS1AiuOgR2DwMxPC5uASomww1jqjXCTVhZIoqE="

# Execute curl command
response=$(curl -X POST "$url" \
    -H "Content-Type: application/x-www-form-urlencoded" \
    -d "grant_type=client_credentials" \
    --data-urlencode "client_id=$client_id" \
    --data-urlencode "client_secret=$client_secret" -v)

# Output response
echo "Response from server: $response"
