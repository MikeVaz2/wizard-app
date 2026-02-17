# Application Architecture

## Components

### Application

Abstract all the data logic in a hook

```jsx
const { config, update } = useApplication();
```

```jsx
<App>
  <Button>Stat Application</Button>
  <Wizard config open></Wizard>
</App>
```

Wizard is build from a modal dialog with a form inside we can base it on `useForm` hook.

```jsx
<Wizard config update>
  <dialog modal open>
    <Form method="dialog">
      <Step config />
    </Form>
  </dialog>
</Wizard>
```

Finally, each step could be a field set with sections and actions button configurable based on a step.

```jsx
<Step>
  <fieldset>
    <Field label type value />
    <Field label type value />
  </fieldset>
</Step>
```

Will try adding some nice touches and elegant solutions!
