const commands = require('probot-commands');
/*const pendingBadgeURL = "https://bit.ly/pending-badge";
const passingBadgeURL = "https://bit.ly/passing-badge";
const silverBadgeURL = "https://bit.ly/silver-badge";
const goldBadgeURL = "https://bit.ly/gold-badge";*/

module.exports = (app) => {

  commands(app, 'generate', (context, command) => {
    const statusArray = command.arguments.split(/, */);
    const status = statusArray[0];
    const pullRequestURL = context.payload.issue.html_url;
    const config = await context.config('config.yml');
    //Badge is pending unless otherwise specified
    let finalBadgeURL = pendingBadgeURL;


    if (status == "passing")
    {
      if(config.pendingBadgeURL)
        finalBadgeURL = passingBadgeURL;
    }
    if (status == "silver")
    {
      if(config.silverBadgeURL)
        finalBadgeURL = silverBadgeURL;
    }
    if (status == "gold")
    {
      if(config.goldBadgeURL)
        finalBadgeURL = goldBadgeURL;
    }

    finalBadgeURL += "&link=" + pullRequestURL;
    const instructions =
    `Paste the Markdown link below where you want the badge displayed.`;
    const finalBadge = "![badge-level](" + finalBadgeURL + ")";
    
    const badgeMessage = finalBadge + "\n" + instructions + "\n```\n" + "Markdown: " + finalBadge + "\n```" ;
    return context.github.issues.createComment(
      context.issue({ body: badgeMessage })
    );
  });

};
