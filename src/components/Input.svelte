<script lang="ts">
  import { onMount } from "svelte";

  export let value: string = "";
  export let placeholder: string = "";
  export let name: string = "";
  export let type: "email" | "password" | "text" = "text";

  let node: HTMLInputElement;
  onMount(() => {
    node.type = type;
  });
</script>

<div class="inputContainer">
  <div class="icon">
    <slot />
  </div>
  <input class="input" {placeholder} {name} bind:this={node} bind:value />
</div>

<style lang="scss">
  .inputContainer {
    display: flex;
    position: relative;
    margin-bottom: 10px;

    .icon {
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);
    }

    .input {
      width: 100%;
      height: 40px;
      line-height: 40px;
      padding-left: 15px;
      padding-right: 50px;
      border: 1px solid black;
      border-radius: 3px;
      outline: none;
    }
  }
</style>
