<template>
  <div>
    <b-dropdown-item to="/video">
      <font-awesome-icon icon="asterisk" />
      <span v-text="$t('global.menu.entities.video')">Video</span>
    </b-dropdown-item>
    <b-dropdown-item to="/rating">
      <font-awesome-icon icon="asterisk" />
      <span v-text="$t('global.menu.entities.rating')">Rating</span>
    </b-dropdown-item>
    <!-- jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here -->
  </div>
</template>

<script lang="ts" src="./entities-menu.component.ts"></script>
