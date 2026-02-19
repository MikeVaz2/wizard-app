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

### Wizard component

Wizard could be built from a modal dialog with a form inside. `useForm` hook can be handy here.

```jsx
<Wizard config update>
  <dialog modal open>
    <Form method="dialog">
      <Step config />
    </Form>
  </dialog>
</Wizard>
```

Finally, each step could be a set of fields with sections and actions button configurable based on a step.

```jsx
<Step>
  <fieldset>
    <Field label type value />
    <Field label type value />
  </fieldset>
</Step>
```

Will try adding some nice touches and elegant solutions!
