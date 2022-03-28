<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="rating">
        <h2 class="jh-entity-heading" data-cy="ratingDetailsHeading">
          <span v-text="$t('jhipsterSampleApplicationApp.rating.detail.title')">Rating</span> {{ rating.id }}
        </h2>
        <dl class="row jh-entity-details">
          <dt>
            <span v-text="$t('jhipsterSampleApplicationApp.rating.puntuation')">Puntuation</span>
          </dt>
          <dd>
            <span>{{ rating.puntuation }}</span>
          </dd>
          <dt>
            <span v-text="$t('jhipsterSampleApplicationApp.rating.date')">Date</span>
          </dt>
          <dd>
            <span v-if="rating.date">{{ $d(Date.parse(rating.date), 'long') }}</span>
          </dd>
          <dt>
            <span v-text="$t('jhipsterSampleApplicationApp.rating.rating')">Rating</span>
          </dt>
          <dd>
            {{ rating.rating ? rating.rating.id : '' }}
          </dd>
          <dt>
            <span v-text="$t('jhipsterSampleApplicationApp.rating.rating')">Rating</span>
          </dt>
          <dd>
            <div v-if="rating.rating">
              <router-link :to="{ name: 'VideoView', params: { videoId: rating.rating.id } }">{{ rating.rating.id }}</router-link>
            </div>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
        </button>
        <router-link v-if="rating.id" :to="{ name: 'RatingEdit', params: { ratingId: rating.id } }" custom v-slot="{ navigate }">
          <button @click="navigate" class="btn btn-primary">
            <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./rating-details.component.ts"></script>
