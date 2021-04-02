<script lang="ts">
  import Logo from "../components/Logo.svelte";
  import { goto } from "@sapper/app";
  import { isLoggedIn } from "../stores/store";
  import { isServer } from "../utils";

  $: $isLoggedIn, checkLogin();

  function checkLogin() {
    if (isServer()) return;

    if ($isLoggedIn) {
      goto("/");
    } else {
      goto("login");
    }
  }
</script>

{#if $isLoggedIn}
  <div class="page">
    <div class="side">
      <Logo />
    </div>
    <div class="content">
      <slot />
    </div>
  </div>
{:else}
  <slot />
{/if}

<style global lang="scss">
  @import "../styles/global.scss";

  .page {
    height: 100%;
    display: flex;
  }

  .side {
    box-shadow: 0 0 3px rgb(0 0 0 / 30%);
    z-index: 3;
    width: 250px;
    background-color: #fdfdfb;
    padding: 30px 30px;
  }

  .content {
    width: 100%;
    padding: 30px 40px;
  }

  #sapper,
  html,
  body {
    height: 100%;
    margin: 0;
  }
</style>
