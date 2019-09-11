const fs = require('fs');
const yaml = require('js-yaml');
const AzureUploader = require('@MARF/klaytn-uploader').AzureUploader;
const MARFBank = artifacts.require('MARFBank');

module.exports = function(deployer) {
	deployer.deploy(MARFBank).then(() => {
		const data = JSON.stringify({
			contractAddress: MARFBank.address
		});

		if (!fs.existsSync('./artifacts')) {
			fs.mkdirSync('./artifacts');
			console.log(`\n    Create Artifacts`);
		}

		fs.writeFileSync('./artifacts/address.json', data);
		console.log(`\n    Create file of contract address to json: ${MARFBank.address}`);

		const abi = JSON.stringify(MARFBank._json.abi);
		fs.writeFileSync('./artifacts/abi.json', abi);
		console.log(`\n    Create file of abi file to json: ${MARFBank.address}`);

		const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME;
		const accessKey = process.env.AZURE_STORAGE_ACCOUNT_ACCESS_KEY;
		const uploader = new AzureUploader(accountName, accessKey);

		const containerName = process.env.AZURE_STORAGE_CONTRACT_CONTAINER_NAME;
		uploader
			.uploadArtifacts(MARFBank._json.contractName, 'artifacts', containerName)
			.then(results => {
				const [abiResult, addressResult] = results;

				const envYaml = {
					CONTRACT_ABI_JSON: abiResult.url.trim(),
					CONTRACT_ADDRESS_JSON: addressResult.url.trim()
				};

				const doc = yaml.safeDump(envYaml, {
					flowLevel: 1,
					styles: {
						'!!null': 'canonical' // dump null as ~
					},
					sortKeys: true // sort object keys
				});

				fs.writeFileSync('./artifacts/.env.contract', doc);
				console.log(`\n    Create file contract env file to yaml`);
			});
	});
};
