const Env = use('Env')
const Event = use('Event')
const Mail = use('Mail')

Event.on('new::user', async (user) => {
  const adminEmail = Env.get('ADMIN_EMAIL_FROM', 'info@gmail.com')
  user.domain = Env.get('APP_URL', '#')
  user.slack_url = Env.get('SLACK_INVITATION_URL', '#')
  await Mail.send('emails.new_user', user, (message) => {
    message
      .from(adminEmail)
      .to(user.email)
  })
})

Event.on('new::user::slack', async ({request, full_name, job_title, phone_number, email_address }) => {
  const url = Env.get('SLACK_HOOK')
  const data = {
    json: {
      text: `someone just joined us\n
       *Name:* ${full_name}\n
       *Job Title:* ${job_title}\n
       *Phone Number:* ${phone_number}\n
       *Email Address:* ${email_address}\n`,
    }
  }
  try {
    const result = await request.post(url, data)
  } catch (e) {
    // console.log(e)
  }
})