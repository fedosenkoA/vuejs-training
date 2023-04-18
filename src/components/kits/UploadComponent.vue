<template>
  <div>
    <div v-if="file">
      <div class="position-relative">
        <img
          class="position-absolute"
          src="/src/assets/images/button.svg"
          alt="Delete"
          style="
            height: 20px;
            width: 19px;
            cursor: pointer;
            opacity: 0.5;
            position: absolute;
            top: 50px;
            right: 50px;
          "
          @click="deleteFile"
        />
      </div>
    </div>
    <label
      for="upload-photo"
      class="upload-div"
      style="
        width: 492px;
        height: 175px;
        border: 2px dashed #dedede;
        border-radius: 10px;
        margin-top: 32px;
        margin-left: 32px;
      "
    >
      <div
        v-if="!fileUrl"
        class="d-flex flex-column justify-content-center align-items-center h-100"
      >
        <img
          alt="UploadNewPhotoIcon"
          src="/src/assets/images/uploadNewPhotoIcon.svg"
          style="height: 55px; width: 55px"
        />
        <span style="color: #464646">Upload photo</span>
        <span style="font-size: 16px; color: #858585">{{ message }}</span>
      </div>
      <div
        v-if="fileUrl"
        class="d-flex justify-content-center align-items-center h-100"
      >
        <img
          :src="fileUrl"
          class="rounded"
          alt="image"
          style="max-width: 492px; max-height: 171px"
        />
      </div>
    </label>
    <input
      id="upload-photo"
      type="file"
      style="display: none"
      @change="handleFileUpload($event)"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
const file = ref();
const fileUrl = ref('');
const message = ref('Click here to upload photo');

const handleFileUpload = (event) => {
  if (
    event.target.files &&
    event.target.files[0] &&
    checkImage(event.target.files[0])
  ) {
    file.value = event.target.files[0];
    fileUrl.value = URL.createObjectURL(event.target.files[0]);
    emitFile();
  }
};

const checkImage = (file) => {
  const validImageTypes = ['image/jpg', 'image/jpeg', 'image/png'];
  if (validImageTypes.includes(file.type) && file.size < 1000000) {
    message.value = 'Click here to upload photo';
    return true;
  }
  message.value = 'Image can be png, jpg, jpeg and max size 1MB';
  return false;
};

const deleteFile = () => {
  file.value = null;
  fileUrl.value = '';
  emitFile();
};

const emit = defineEmits(['upload']);
const emitFile = () => {
  emit('upload:value', file.value);
};
</script>

<style scoped></style>
