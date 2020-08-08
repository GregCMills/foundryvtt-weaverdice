/**
 * Extend the base Actor entity
 * @extends {Actor}
 */
export class SimpleActor extends Actor {

    /** @override */
    getRollData() {
		// get the parent getRollData function values.
		const data = super.getRollData();

		// Re-map all attributes onto the base roll data
		{
		for ( let [k, v] of Object.entries(data.attributes) ) {
			if ( !(k in data) ) data[k] = v.value;
		}
		delete data.attributes;
		}

		// Map all items data using their slugified names
		data.items = this.data.items.reduce((obj, i) => {
		let key = i.name.slugify({strict: true});
		let itemData = duplicate(i.data);
		{
			for ( let [k, v] of Object.entries(itemData.attributes) ) {
			if ( !(k in itemData) ) itemData[k] = v.value;
			}
			delete itemData["attributes"];
		}
		obj[key] = itemData;
		return obj;
		}, {});
		return data;
    }
  }
  