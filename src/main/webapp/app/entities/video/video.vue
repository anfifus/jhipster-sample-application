<template>
  <div>
    <h2 id="page-heading" data-cy="VideoHeading">
      <span v-text="$t('jhipsterSampleApplicationApp.video.home.title')" id="video-heading">Videos</span>
      <div class="d-flex justify-content-end">
        <button class="btn btn-info mr-2" v-on:click="handleSyncList" :disabled="isFetching">
          <font-awesome-icon icon="sync" :spin="isFetching"></font-awesome-icon>
          <span v-text="$t('jhipsterSampleApplicationApp.video.home.refreshListLabel')">Refresh List</span>
        </button>
        <router-link :to="{ name: 'VideoCreate' }" custom v-slot="{ navigate }">
          <button
            @click="navigate"
            id="jh-create-entity"
            data-cy="entityCreateButton"
            class="btn btn-primary jh-create-entity create-video"
          >
            <font-awesome-icon icon="plus"></font-awesome-icon>
            <span v-text="$t('jhipsterSampleApplicationApp.video.home.createLabel')"> Create a new Video </span>
          </button>
        </router-link>
      </div>
    </h2>
    <br />
    <div class="alert alert-warning" v-if="!isFetching && videos && videos.length === 0">
      <span v-text="$t('jhipsterSampleApplicationApp.video.home.notFound')">No videos found</span>
    </div>
    <div class="table-responsive" v-if="videos && videos.length > 0">
      <table class="table table-striped" aria-describedby="videos">
        <thead>
          <tr>
            <th scope="row"><span v-text="$t('global.field.id')">ID</span></th>
            <th scope="row"><span v-text="$t('jhipsterSampleApplicationApp.video.url')">Url</span></th>
            <th scope="row"><span v-text="$t('jhipsterSampleApplicationApp.video.description')">Description</span></th>
            <th scope="row"><span v-text="$t('jhipsterSampleApplicationApp.video.title')">Title</span></th>
            <th scope="row"><span v-text="$t('jhipsterSampleApplicationApp.video.videoSize')">Video Size</span></th>
            <th scope="row"><span v-text="$t('jhipsterSampleApplicationApp.video.video')">Video</span></th>
            <th scope="row"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="video in videos" :key="video.id" data-cy="entityTable">
            <td>
              <router-link :to="{ name: 'VideoView', params: { videoId: video.id } }">{{ video.id }}</router-link>
            </td>
            <td>{{ video.url }}</td>
            <td>{{ video.description }}</td>
            <td>{{ video.title }}</td>
            <td>{{ video.videoSize }}</td>
            <td>
              {{ video.video ? video.video.title : '' }}
            </td>
            <td class="text-right">
              <div class="btn-group">
                <router-link :to="{ name: 'VideoView', params: { videoId: video.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-info btn-sm details" data-cy="entityDetailsButton">
                    <font-awesome-icon icon="eye"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                  </button>
                </router-link>
                <router-link :to="{ name: 'VideoEdit', params: { videoId: video.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-primary btn-sm edit" data-cy="entityEditButton">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                  </button>
                </router-link>
                <b-button
                  v-on:click="prepareRemove(video)"
                  variant="danger"
                  class="btn btn-sm"
                  data-cy="entityDeleteButton"
                  v-b-modal.removeEntity
                >
                  <font-awesome-icon icon="times"></font-awesome-icon>
                  <span class="d-none d-md-inline" v-text="$t('entity.action.delete')">Delete</span>
                </b-button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <b-modal ref="removeEntity" id="removeEntity">
      <span slot="modal-title"
        ><span id="jhipsterSampleApplicationApp.video.delete.question" data-cy="videoDeleteDialogHeading" v-text="$t('entity.delete.title')"
          >Confirm delete operation</span
        ></span
      >
      <div class="modal-body">
        <p id="jhi-delete-video-heading" v-text="$t('jhipsterSampleApplicationApp.video.delete.question', { id: removeId })">
          Are you sure you want to delete this Video?
        </p>
      </div>
      <div slot="modal-footer">
        <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
        <button
          type="button"
          class="btn btn-primary"
          id="jhi-confirm-delete-video"
          data-cy="entityConfirmDeleteButton"
          v-text="$t('entity.action.delete')"
          v-on:click="removeVideo()"
        >
          Delete
        </button>
      </div>
    </b-modal>
  </div>
</template>

<script lang="ts" src="./video.component.ts"></script>
