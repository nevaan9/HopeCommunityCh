<template>
  <v-content>
    <v-btn color="success" @click="pickFile">Select Image</v-btn>
    <input
      type="file"
      ref="image"
      accept="image/*"
      @change="onFilePicked"
      :name="inputName"
      style="display:none"
    />
    <v-container fluid>
      <v-flex>
        <v-card class="elevation-0 trasparent">
          <v-container grid-list-lg fluid>
            <v-layout row wrap>
              <v-flex
                xs12
                sm3
                md2
                v-for="(image, i) in images"
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
        </v-card>
      </v-flex>
    </v-container>
  </v-content>
</template>

<script>
export default {
  name: 'Events',
  data: () => ({
    formData: new FormData(),
    inputName: 'image', // This is what multer will be looking at in the backend
    images: []
  }),

  methods: {
    pickFile() {
      this.$refs.image.click()
    },

    onFilePicked(e) {
      const fieldName = e.target.name
      const files = e.target.files
      if (files[0] !== undefined) {
        if (files[0].name.lastIndexOf('.') <= 0) {
          return
        }
        const fr = new FileReader()
        fr.readAsDataURL(files[0])
        fr.addEventListener('load', () => {
          const imageObj = {
            imageName: files[0].name,
            imageUrl: fr.result,
            imageFile: files[0] // this is an image file that can be sent to server...
          }
          this.images.push(imageObj)
        })

        if (!files.length) return

        // append the files to FormData
        Array.from(Array(files.length).keys()).map(x => {
          this.formData.append(fieldName, files[x], files[x].name)
        })
      }
    }
  }
}
</script>

<style scoped></style>
