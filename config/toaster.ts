
const toastOptions = {
    success: {
      style: {
        background: 'hsl(var(--clr-accent-secondary))',
        color: 'hsl(var(--clr-neutral-light))'
      },

      iconTheme: {
        primary: 'hsl(var(--clr-neutral-light))',
        secondary: 'hsl(var(--clr-neutral-dark))'
      }
    },
    error: {
      style: {
        background: 'hsl(var(--clr-accent) / .8)',
        color: 'hsl(var(--clr-neutral-light))'
      },

      iconTheme: {
        primary: 'hsl(var(--clr-neutral-light))',
        secondary: 'hsl(var(--clr-accent))'
      }
    },
  }

  export default toastOptions