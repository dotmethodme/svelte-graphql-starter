<script>
  import LockIcon from "../icons/LockIcon.svelte";
  import EmailIcon from "../icons/EmailIcon.svelte";
  import { Api } from "../service/api";
  import { userToken } from "../stores/store";
  import Input from "../components/Input.svelte";
  import Button from "../components/Button.svelte";

  let email = "";
  let password = "";

  async function handleLogin() {
    const { login } = await Api.login({ email, password });
    const { token } = login;

    if (!token) return;

    $userToken = token;
  }
</script>

<div class="container">
  <div class="subContainer">
    <Input bind:value={email} placeholder="Email" name="email" type="text">
      <EmailIcon />
    </Input>

    <Input
      bind:value={password}
      placeholder="Password"
      name="password"
      type="password"
    >
      <LockIcon />
    </Input>
    <Button onClick={handleLogin}>Submit</Button>
  </div>
</div>

<style lang="scss">
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }

  .subContainer {
    display: flex;
    flex-direction: column;
  }
</style>
