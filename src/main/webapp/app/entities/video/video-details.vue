<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="video">
        <h2 class="jh-entity-heading" data-cy="videoDetailsHeading">
          <span v-text="$t('jhipsterSampleApplicationApp.video.detail.title')">Video</span> {{ video.id }}
        </h2>
        <dl class="row jh-entity-details">
          <dt>
            <span v-text="$t('jhipsterSampleApplicationApp.video.url')">Url</span>
          </dt>
          <dd>
            <span>{{ video.url }}</span>
          </dd>
          <dt>
            <span v-text="$t('jhipsterSampleApplicationApp.video.description')">Description</span>
          </dt>
          <dd>
            <span>{{ video.description }}</span>
          </dd>
          <dt>
            <span v-text="$t('jhipsterSampleApplicationApp.video.title')">Title</span>
          </dt>
          <dd>
            <span>{{ video.title }}</span>
          </dd>
          <dt>
            <span v-text="$t('jhipsterSampleApplicationApp.video.videoSize')">Video Size</span>
          </dt>
          <dd>
            <span>{{ video.videoSize }}</span>
          </dd>
          <dt>
            <span v-text="$t('jhipsterSampleApplicationApp.video.video')">Video</span>
          </dt>
          <dd>
            {{ video.video ? video.video.title : '' }}
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
        </button>
        <router-link v-if="video.id" :to="{ name: 'VideoEdit', params: { videoId: video.id } }" custom v-slot="{ navigate }">
          <button @click="navigate" class="btn btn-primary">
            <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./video-details.component.ts"></script>
