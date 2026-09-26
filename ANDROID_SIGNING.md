# Android release signing

The repository supports environment-driven release signing, but no keystore or password is committed.

## Local build variables

Set these variables only in a protected shell or CI secret store:

```text
PAYDAYMATE_KEYSTORE_PATH=/secure/path/payday-mate-upload.jks
PAYDAYMATE_KEYSTORE_PASSWORD=<keystore password>
PAYDAYMATE_KEY_ALIAS=paydaymate
PAYDAYMATE_KEY_PASSWORD=<key password>
```

Then run:

```bash
cd android
./gradlew assembleRelease
```

## GitHub Actions

For a production workflow, store the keystore as an encrypted repository secret such as `PAYDAYMATE_KEYSTORE_BASE64`, and store the four signing values as encrypted secrets. Decode the keystore into the runner's temporary directory, set the environment variables for the Gradle step, build the release, and delete the temporary keystore after the job. Never commit a `.jks`, `.keystore`, password, or base64 keystore file.

The current GitHub Action intentionally fails only when `fail-on-unsigned: 'true'`; this allows testing builds to report unsigned artifacts while production workflows can enforce signed output.
