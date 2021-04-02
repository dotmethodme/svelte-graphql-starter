<script lang="ts">
  export let onClick: () => void = () => {};
  export let variant: "primary" | "empty" = "primary";
</script>

<button class={`button ${variant}`} on:click={onClick}>
  <slot />
</button>

<style lang="scss">
  .button {
    background: none transparent;
    border: none;
    height: 40px;
    padding: 0 15px;
    border-radius: 100px;

    &.primary {
      background-color: black;
      color: white;
    }

    &.empty {
      background-color: transparent;
      border: 1px solid black;
      color: black;
    }
  }
</style>
