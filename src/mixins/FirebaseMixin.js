export const FirebaseMixin = {
  methods: {
    // BUSCA OS DOCUMENTOS DE UMA COLECAO DE ACORDO COM O PARAMETRO ESPECIFICADO
    async getDocument (db, collection, param, param_content) {
      let documents = []
      await db.collection(collection).where(param, "==", param_content)
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

    // CRIA UM DOCUMENTO, ESPECIFICANDO OU NAO O SEU ID, BEM COMO EDITA CASO JÁ EXISTA
    // EM CASO DE EDICAO, TROCA OS DADOS NO DOCUMENTO EXISTENTE PELOS DADOS ENVIADOS
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

    // INSERE UM DADO ADICIONAL A UM DOCUMENTO ESPECIFICADO, MANTENDO AS INFORMACOES JÁ EXISTENTES
    async firebaseUpdate (db, collection, document, data) {
      const doc = await db.collection(collection).doc(document)
      doc.set({
        data
      }, { merge: true })
    }
  }
}
