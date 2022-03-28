<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2
          id="jhipsterSampleApplicationApp.video.home.createOrEditLabel"
          data-cy="VideoCreateUpdateHeading"
          v-text="$t('jhipsterSampleApplicationApp.video.home.createOrEditLabel')"
        >
          Create or edit a Video
        </h2>
        <div>
          <div class="form-group" v-if="video.id">
            <label for="id" v-text="$t('global.field.id')">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="video.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('jhipsterSampleApplicationApp.video.url')" for="video-url">Url</label>
            <input
              type="text"
              class="form-control"
              name="url"
              id="video-url"
              data-cy="url"
              :class="{ valid: !$v.video.url.$invalid, invalid: $v.video.url.$invalid }"
              v-model="$v.video.url.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('jhipsterSampleApplicationApp.video.description')" for="video-description"
              >Description</label
            >
            <input
              type="text"
              class="form-control"
              name="description"
              id="video-description"
              data-cy="description"
              :class="{ valid: !$v.video.description.$invalid, invalid: $v.video.description.$invalid }"
              v-model="$v.video.description.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('jhipsterSampleApplicationApp.video.title')" for="video-title">Title</label>
            <input
              type="text"
              class="form-control"
              name="title"
              id="video-title"
              data-cy="title"
              :class="{ valid: !$v.video.title.$invalid, invalid: $v.video.title.$invalid }"
              v-model="$v.video.title.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('jhipsterSampleApplicationApp.video.videoSize')" for="video-videoSize"
              >Video Size</label
            >
            <input
              type="number"
              class="form-control"
              name="videoSize"
              id="video-videoSize"
              data-cy="videoSize"
              :class="{ valid: !$v.video.videoSize.$invalid, invalid: $v.video.videoSize.$invalid }"
              v-model.number="$v.video.videoSize.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('jhipsterSampleApplicationApp.video.video')" for="video-video">Video</label>
            <select class="form-control" id="video-video" data-cy="video" name="video" v-model="video.video">
              <option v-bind:value="null"></option>
              <option
                v-bind:value="video.video && userOption.id === video.video.id ? video.video : userOption"
                v-for="userOption in users"
                :key="userOption.id"
              >
                {{ userOption.title }}
              </option>
            </select>
          </div>
        </div>
        <div>
          <button type="button" id="cancel-save" data-cy="entityCreateCancelButton" class="btn btn-secondary" v-on:click="previousState()">
            <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.cancel')">Cancel</span>
          </button>
          <button
            type="submit"
            id="save-entity"
            data-cy="entityCreateSaveButton"
            :disabled="$v.video.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./video-update.component.ts"></script>
