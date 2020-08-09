/**
 * Extend the base Actor entity by defining a custom roll data structure which is ideal for the Simple system (will probably need to change to something better
 * for weaverdice later).
 * @extends {Actor}
 */
export class SimpleActor extends Actor {

    /** @override */
    getRollData() {
		// get the parent getRollData function values.
		const data = super.getRollData();

		// Re-map all attributes onto the base roll data
		for ( let [k, v] of Object.entries(data.attributes) ) {
			if ( !(k in data) ) data[k] = v.value;
		}
		delete data.attributes;

		// Map all items data using their slugified names
		// perform the custom reduce function on all elements of data.items
		data.items = this.data.items.reduce((reducedItems, i) => {
			// slugify (make human readable) item name
			let key = i.name.slugify({strict: true});
			// straight copy over the item data.
			let itemData = duplicate(i.data);

			// for each of the key value pairs in itemData.attributes.
			for ( let [k, v] of Object.entries(itemData.attributes) ) {
				// If the attribute name isn't already directly in itemdata (i.e. is still in the .attribute sub property.), add it.
				if ( !(k in itemData) ) itemData[k] = v.value;
			}
			// Once you've copied accross all the attributes directly to the itemdata delete the attribute property
			delete itemData["attributes"];
			//add the key-value pair of this item to the reducedItems list (or array or whatever, fuck javascript).
			reducedItems[key] = itemData;
			return reducedItems;
		}, {});
		return data;
    }
  }
  