<template>
  <v-content>
    <div v-for="(fd, i) in formData" :key="i">
      <p>{{ fd.name }}</p>
      <button @click="formData = formData.filter(f => f.id !== fd.id)">
        Delete
      </button>
    </div>
    <v-btn color="success" @click="save">Submit</v-btn>
    <!--UPLOAD-->
    <form enctype="multipart/form-data" novalidate v-if="isInitial || isSaving">
      <input
        accept="image/*"
        type="file"
        multiple
        :name="uploadFieldName"
        :disabled="isSaving"
        @change="
          filesChange($event.target.name, $event.target.files)
          fileCount = $event.target.files.length
        "
        class="input-file"
      />
    </form>
    <v-container fluid>
      <v-flex
        xs12
        class="text-xs-center text-sm-center text-md-center text-lg-center"
      >
        <!--SUCCESS-->
        <div v-if="isSuccess">
          <h2>Uploaded {{ uploadedFiles.length }} file(s) successfully.</h2>
          <p>
            <a href="javascript:void(0)" @click="reset()">Upload again</a>
          </p>
          <ul class="list-unstyled">
            <li v-for="(item, i) in uploadedFiles" :key="i">
              <img
                :src="item.url"
                class="img-responsive img-thumbnail"
                :alt="item.originalName"
              />
            </li>
          </ul>
        </div>
        <!--FAILED-->
        <div v-if="isFailed">
          <h2>Uploaded failed.</h2>
          <p>
            <a href="javascript:void(0)" @click="reset()">Try again</a>
          </p>
          <pre>{{ uploadError }}</pre>
        </div>
      </v-flex>
    </v-container>
  </v-content>
</template>

<script>
const STATUS_INITIAL = 0,
  STATUS_SAVING = 1,
  STATUS_SUCCESS = 2,
  STATUS_FAILED = 3,
  BASE_URL = 'http://localhost:3000'

export default {
  name: 'Mission',
  data() {
    return {
      uploadedFiles: [],
      uploadError: null,
      currentStatus: null,
      uploadFieldName: 'image',
      formData: [],
      idGen: 0
    }
  },
  computed: {
    isInitial() {
      return this.currentStatus === STATUS_INITIAL
    },
    isSaving() {
      return this.currentStatus === STATUS_SAVING
    },
    isSuccess() {
      return this.currentStatus === STATUS_SUCCESS
    },
    isFailed() {
      return this.currentStatus === STATUS_FAILED
    }
  },
  methods: {
    reset() {
      // reset form to initial state
      this.currentStatus = STATUS_INITIAL
      this.uploadedFiles = []
      this.uploadError = null
    },
    save() {
      const formDataReq = new FormData()

      // Create the Form Data Object to send to the server
      this.formData.forEach(fd => {
        formDataReq.append(fd.fieldName, fd.file, fd.name)
      })
      // upload data to the server
      this.currentStatus = STATUS_SAVING

      this.upload(formDataReq)
        .then(x => {
          this.uploadedFiles = [].concat(x)
          this.currentStatus = STATUS_SUCCESS
        })
        .catch(err => {
          this.uploadError = err.response
          this.currentStatus = STATUS_FAILED
        })
    },
    upload(formData) {
      const url = `${BASE_URL}/test`
      return (
        this.$axios
          .post(url, formData)
          // get data
          .then(x => x.data)
          // add url field
          .then(x =>
            x.map(img =>
              Object.assign({}, img, { url: `${BASE_URL}/images/${img.id}` })
            )
          )
      )
    },
    filesChange(fieldName, fileList) {
      if (!fileList.length) return
      // append the files to FormData
      Array.from(Array(fileList.length).keys()).map(x => {
        const imageObj = {
          id: this.idGen++,
          name: fileList[x].name,
          file: fileList[x], // this is an image file that can be sent to server...
          fieldName
        }
        this.formData.push(imageObj)
      })

      // save it
      // this.save(formData)
    }
  },
  mounted() {
    this.reset()
  }
}
</script>

<style scoped></style>
