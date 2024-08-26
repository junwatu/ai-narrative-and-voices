/**
 * Need to be fixed later
 * 
const griddb = require('griddb-node-sdk');

const factory = new griddb.StoreFactory.getInstance();
const store = factory.getStore({
	host: "your-host",
	port: 10001,
	clusterName: "your-cluster-name",
	username: "admin",
	password: "admin"
});
*/

async function getDocumentaryMetadata(docId) {
    /**
		const container = await store.getContainer("documentary_metadata");
		const query = container.query(`SELECT * WHERE id = '${docId}'`);
		const rs = await query.fetch();
		if (rs.hasNext()) {
			return rs.next();
		}
	
	**/
	return null
}

async function saveDocumentaryMetadata(metadata) {
    /**
	const container = await store.getContainer("documentary_metadata");
	await container.put(metadata);
	*/
	return null
}

export { getDocumentaryMetadata, saveDocumentaryMetadata }
