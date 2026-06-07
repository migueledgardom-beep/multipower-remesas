const SCRIPT_URL =
'https://script.google.com/macros/s/AKfycbzm8FVMVuYILl9fo4hGrLrzaoVrQQ9d4rOI2oFeVgrwiaqUtW9_jV-Je0h-umWYc9Bd3g/exec'

export async function saveOperation(data) {

try {

```
await fetch(SCRIPT_URL, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),
})
```

} catch (err) {

```
console.error(
  'Error guardando operación:',
  err
)
```

}
}
