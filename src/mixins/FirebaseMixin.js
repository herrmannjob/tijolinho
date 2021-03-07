export const FirebaseMixin = {
  methods: {
    async getDocument (db, collection, param, id) {
      let documents = []
      await db.collection(collection).where(param, "==", id)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            documents.push(doc.data())
          })
        })
        .catch((error) => {
          console.log("Error getting documents: ", error)
        })
      if (documents.length > 0) return { status: 'ok', documents }
      else return { status: 'empty', documents }
    },
    async firebaseCreate (db, collection, document, data) {
      if (document !== null) {
        try {
          await db.collection(collection).doc(document).set(data)
          const message = `${collection} salvo(a)(s) com sucesso!`
          console.log(message)
          return { status: 'ok', message }
        } catch (error) {
          console.log('error: ', error)
          return { status: 'error', message: error }
        }
      } else {
        try {
          db.collection(collection).add(data)
          const message = `${collection} salvo(a)(s) com sucesso!`
          console.log(message)
          return { status: 'ok', message }
        } catch (error) {
          console.log('error: ', error)
          return { status: 'error', message: error }
        }
      }
    },
    async firebaseUpdate (db, collection, document, data) {
      const doc = await db.collection(collection).doc(document)
      doc.set({
        data
      }, { merge: true })
    }
  }
}
