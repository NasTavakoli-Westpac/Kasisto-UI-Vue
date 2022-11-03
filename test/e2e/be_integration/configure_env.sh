# TODO:
# 1.) Move js file (esnure async behavior ==> promises?)
# 2.) Move all configs to Config.js
# 3.) Take the package version as a cmd line arg

target_host="http://localhost:8090"
package_secret="AzIYwF84K-534GfdNTriV-YTSGd8PMaq"
iapi_secret="ef576554-637f-11e8-adc0-fa7ae01bbebc"

version_lookup=(
  ["311"]="data-kai-en_US-2020-03-05-01b49626-1620-4825-9578-dfb1da0d35c6-4a4c053afb6b0904159211fef726ea4d.tar.gz",
  ["321"]="data-kai-en_US-2020-06-08-8165a075-85cf-49c9-aec6-84b793f37a3a-47048ac84b603e6f70def1c0ad3fbacb.tar.gz",
  ["40"]="assistant-system-ad162b47-5de4-446b-90ef-a8274bb7e559-9abb4b3061867310a9d0dd4390ca164d.tar.gz",
  ["41"]="ASSISTANT-models_all-99ad960c12df72abbb668fb259ee28d5.tar.gz"
)

curl -H "secret:${package_secret}" -F package=@"packages/${version_lookup[41]}" ${target_host}/kai/api/v1/package/replace?mode=apply

curl --request POST \
  --url ${target_host}/kai/api/v1/assistants/ \
  --header 'content-type: application/json' \
  --header 'secret:'${iapi_secret} \
  --data '{
	"display_name": "default name",
	"name": "default_assistant", 
	"notes": "blah blah", 
	"locale": "en_US",
	"default" : {
		"endpoints" : {
			"capi" : {
				"secret" : "default"
			},
			"iapi" : {
				"secret" : "default"
			}
		}
	},
	"targets": [
		{
			"name": "stage",
			"display_name": "staging",
			"primary": false,
			"endpoints": {
				"capi": {
					"secret": "stage"
				},
				"eapi": {
					"secret": "stage"
				}
			}
		},
		{
			"name": "prod",
			"display_name": "production",
			"primary": true,
			"endpoints": {
				"capi": {
					"secret": "prod"
				},
				"eapi": {
					"secret": "prod"
				}
			}
		}
	]
}'