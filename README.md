## Smart AXLT

# Add your files

```
cd existing_repo
git remote add origin https://github.com/AxolotLTD/smart-contract-axlt.git
git branch -M main
git push -uf origin main
```

# Install node modules

```
npm i
```

# Share files with remix

```
remixd -s ".\contracts" -u "https://remix.ethereum.org"
```

# Run your tests

```
npx hardhat test --network {your_network} ".\tests\{your_test}"
```

# How to deploy contracts

```
npx hardhat run --network {your_network} ".scripts\{your_script}"
```
