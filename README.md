# bloggerletter
A service to receive articles of an old well established Blogger, blogspot blog as regular newsletters

## Requirements
docker
node.js

## Run development

To run the development environment run `npm run dev`.

## Testing Mails

To test the emailing function we can use a service like [Mailtrap](https://mailtrap.io/). This will create an SMTP server for us and we can check if our Node mailer works, how our mails look etc. It doesn't really send mails but drops all sent mails into an inbox it creates.

Open a free Mailtrap account and find your server settings in SMTP Settings -> Nodemailer:
```
var transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: <username>,
    pass: <password>
  }
});
```

Add this info in `utils/emailer.js`.