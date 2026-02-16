# Application Architecture

## Components

Application
```jsx
    <App>
        <Button>Stat Application</Button>
        <Wizard config open>
        </Wizard>
    </App>
```

Wizard
```jsx
<Wizard>
    <dialog modal open>
        <Form method="dialog">
            <Step>
            </Step>
        </Form>
    </dialog>
</Wizard>
```
