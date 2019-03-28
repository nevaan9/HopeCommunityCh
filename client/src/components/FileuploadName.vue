<template>
  <v-flex row :class="selectType === 'single' ? 'sm3' : 'sm4'">
    <v-container fluid>
      <v-flex>
        <v-card class="elevation-0 trasparent">
          <v-container grid-list-lg fluid>
            <v-layout row wrap>
              <v-flex
                :class="selectType === 'single' ? 'sm12' : 'sm4'"
                v-for="(image, i) in formData"
                :key="i"
                xs4
                d-flex
              >
                <v-card flat tile class="d-flex">
                  <v-img
                    :src="image.imageUrl"
                    :lazy-src="image.imageUrl"
                    aspect-ratio="1"
                    class="grey lighten-2"
                  >
                    <v-layout
                      slot="placeholder"
                      fill-height
                      align-center
                      justify-center
                      ma-0
                    >
                      <v-progress-circular
                        indeterminate
                        color="grey lighten-5"
                      ></v-progress-circular>
                    </v-layout>
                  </v-img>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
          <v-card-actions>
            <v-btn color="success" @click="select">{{ title }}</v-btn>
            <v-btn v-if="selfUpload" color="success" @click="save"
              >Submit</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-container>
    <!--UPLOAD-->
    <form enctype="multipart/form-data" novalidate v-if="isInitial || isSaving">
      <input
        style="display: none"
        ref="formdataInput"
        accept="image/*"
        type="file"
        :single="selectType === 'single'"
        :multiple="selectType === 'multiple'"
        :name="uploadFieldName"
        @change="
          filesChange($event.target.name, $event.target.files)
          fileCount = $event.target.files.length
        "
        class="input-file"
      />
    </form>
  </v-flex>
</template>

<script>
const STATUS_INITIAL = 0,
  STATUS_SAVING = 1,
  STATUS_SUCCESS = 2,
  STATUS_FAILED = 3,
  BASE_URL = 'http://localhost:3000'

export default {
  name: 'FileUploadName',
  props: {
    selectType: {
      type: String,
      required: true,
      default: 'single'
    },
    selfUpload: {
      type: Boolean,
      required: true,
      default: true
    },
    requestFormdata: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      required: true
    },
    overRideName: {
      type: String,
      default: null
    }
  },
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
  watch: {
    requestFormdata(val) {
      if (!this.selfUpload && val) this.save()
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
    select() {
      this.$refs.formdataInput.click()
    },
    save() {
      const formDataReq = new FormData()
      // Create the Form Data Object to send to the server
      this.formData.forEach(fd => {
        formDataReq.append(fd.fieldName, fd.file, fd.name)
      })
      // upload data to the server
      this.currentStatus = STATUS_SAVING
      // If its a self upload, send the data from this component
      // Else, send the data to parent
      if (this.selfUpload) {
        this.upload(formDataReq)
          .then(x => {
            this.uploadedFiles = [].concat(x)
            this.currentStatus = STATUS_SUCCESS
          })
          .catch(err => {
            this.uploadError = err.response
            this.currentStatus = STATUS_FAILED
          })
      } else {
        this.$emit('sendingFormData', formDataReq)
      }
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
      Array.from(Array(fileList.length).keys()).map(async x => {
        const fr = new FileReader()
        fr.readAsDataURL(fileList[x])
        await fr.addEventListener('load', () => {
          const imageObj = {
            id: this.idGen++,
            name: this.overRideName ? this.overRideName : fileList[x].name,
            file: fileList[x], // this is an image file that can be sent to server...
            fieldName,
            imageUrl: fr.result
          }
          if (this.selectType === 'single') {
            this.formData.pop()
          }
          this.formData.push(imageObj)
          // save it
          this.save()
        })
      })
    }
  },
  mounted() {
    this.reset()
  }
}
</script>

<style scoped></style>
