var express = require('express');
var app = express();
var request = require('request');

var _ = require('lodash');

//var passport = require('passport');

//var Authentication = require('./authentication');


// marker for `grunt-express` to inject static folder/contents
app.use(function staticsPlaceholder(req, res, next) {
  return next();
});

app.get('/issue', function(req, res, next){

  var originalCurrent= {"key":"ION-4161","id":72318,"editable":true,"canCreateComment":true,"isSubtask":false,"fields":[{"id":"issuekey","label":"issue.key","editable":false,"renderer":"text","text":"ION-4161"},{"id":"summary","label":"Summary","editable":true,"type":"textarea","renderer":"text","text":"Move environments support to Core Services"},{"id":"description","label":"Description","editable":true,"type":"textarea","renderer":"html","html":"<p>As an administrator, I should be able to create sub-organizations under my org. I should be able to configure the number of vCores available for each sub-org and invite users to each sub-org. I should be able to set other preferences for the sub-org like the default region. </p>\n\n\n<p>------------------<br/>\nHere is the doc for Cloudhub CS intergration<br/>\n<a href=\"https://docs.google.com/a/mulesoft.com/document/d/1g5JMJ_Z8YydikyBoNMZuXRdwqtJ_CR-lrCb3w1SZ6g8/edit#heading=h.tkznap1tusz5\" class=\"external-link\" rel=\"nofollow\">https://docs.google.com/a/mulesoft.com/document/d/1g5JMJ_Z8YydikyBoNMZuXRdwqtJ_CR-lrCb3w1SZ6g8/edit#heading=h.tkznap1tusz5</a></p>\n\n<p>Basically, all the cloudhub apis that have environments in its response are removed, except the following GET will exists for a while for backwards compatibility. <br/>\n/api/accounts<br/>\n/api/environments<br/>\n/api/environments/</p>\n{envId}\n<p>/api/sandboxes<br/>\n/api/admin/organizations/</p>\n{orgId}\n<p>/environments</p>\n\n<p>In /api/accounts, the response only retains environments, defaultEnvironment, and activeEnvironment. The activeEnvironment is the same as defaultEnvionment since cloudhub doesn't know about active environment any more, and it should be only used by studio to select an environment in the dropdown list.</p>\n\n<p>In Organization apis, application limit and environment limit have been dropped. They are controlled by CS from now on. Cloudhub will have an internal limit on applications.</p>\n\n<p>The scenario for the new authentication is described in detail in the above doc.</p>\n\n<p>Just for reference, the core service api reference can be found at<br/>\n<a href=\"https://docs.google.com/a/mulesoft.com/document/d/1E3-e3yGtfHGJpykOXB2ExLBZj_6gfnW9KCXS_YMu2Is/edit#heading=h.he3vp4qdhrm\" class=\"external-link\" rel=\"nofollow\">https://docs.google.com/a/mulesoft.com/document/d/1E3-e3yGtfHGJpykOXB2ExLBZj_6gfnW9KCXS_YMu2Is/edit#heading=h.he3vp4qdhrm</a></p>\n"},{"id":"status","label":"Status","editable":false,"renderer":"status","text":"To Be Reviewed","statusEntry":{"id":"10002","name":"To Be Reviewed","description":"","iconUrl":"https://www.mulesoft.org/jira/images/icons/statuses/visible.png","statusCategory":{"id":"2","key":"new","colorName":"blue-gray"}}},{"id":"components","label":"Component/s","editable":false,"renderer":"text","text":"Platform"},{"id":"labels","label":"Labels","editable":false,"renderer":"text"},{"id":"versions","label":"Affects Version/s","editable":false,"renderer":"text"},{"id":"fixVersions","label":"Fix Version/s","editable":false,"renderer":"text","text":"March 2015"},{"id":"issuelinks","label":"Linked Issues","editable":false,"type":"text","renderer":"html","category":"links","html":""},{"id":"reporter","label":"Reporter","editable":false,"renderer":"html","html":"Papi Menon"},{"id":"assignee","label":"Assignee","editable":false,"renderer":"html","html":"Unassigned"},{"id":"created","label":"Created","editable":false,"renderer":"date","html":"06/Mar/15 08:42 PM","text":"2015-03-06T20:42:25-0300"},{"id":"updated","label":"Updated","editable":false,"renderer":"date","html":"16/Apr/15 07:03 PM","text":"2015-04-16T19:03:47-0300"},{"id":"customfield_10941","label":"Epic","editable":false,"renderer":"epiclink","epicKey":"ION-4150","epicColor":"ghx-label-7","text":"Environments Migration to Core Services","canRemoveEpic":true},{"id":"customfield_11345","label":"InfoSeq Implications","editable":false,"type":"text","renderer":"html","category":"details"},{"id":"customfield_10203","label":"Story Points","editable":false,"type":"number","renderer":"text"}],"comments":[{"id":104028,"author":"sebastian.gramano","authorName":"Sebastian Gramano","avatarUrl":"https://www.mulesoft.org/jira/secure/useravatar?size=xsmall&ownerId=sebastian.gramano&avatarId=11733","dateTime":"2015-04-07T11:50:35-0300","dateTimeDisplay":"07/Apr/15 11:50 AM","html":"<p>Code is not at QA env</p>"},{"id":103761,"author":"xuan.shi","authorName":"Xuan Shi","avatarUrl":"https://www.mulesoft.org/jira/secure/useravatar?size=xsmall&avatarId=10152","dateTime":"2015-03-31T14:23:02-0300","dateTimeDisplay":"31/Mar/15 02:23 PM","html":"<p><a href=\"https://www.mulesoft.org/jira/secure/ViewProfile.jspa?name=sebastian.gramano\" class=\"user-hover\" rel=\"sebastian.gramano\">Sebastian Gramano</a>I have updated the jira with the reference to the docs.</p>"},{"id":102889,"author":"papi.menon","authorName":"Papi Menon","avatarUrl":"https://www.mulesoft.org/jira/secure/useravatar?size=xsmall&avatarId=10152","dateTime":"2015-03-18T04:03:23-0300","dateTimeDisplay":"18/Mar/15 04:03 AM","html":"<p><a href=\"https://www.mulesoft.org/jira/secure/ViewProfile.jspa?name=dmitry.spasibenko\" class=\"user-hover\" rel=\"dmitry.spasibenko\">Dmitry Spasibenko</a><br/>\nQ1: The navigation between sub-orgs will happen through the CS UI below the user's login name. The UI will present a list of all the sub-orgs to which the user has access (not in a hierarchy). <br/>\nQ2: vcores, multiple environments (yes/no), global deployment (yes/no), default region<br/>\nQ3: Yes, it does. Please see <a href=\"https://docs.google.com/a/mulesoft.com/document/d/1f_KOWtC4pJR8_C91rWgXS0EAKWiSom8Ct-4HOLO-RQU/edit#heading=h.dbv22nl9o3p0\" class=\"external-link\" rel=\"nofollow\">https://docs.google.com/a/mulesoft.com/document/d/1f_KOWtC4pJR8_C91rWgXS0EAKWiSom8Ct-4HOLO-RQU/edit#heading=h.dbv22nl9o3p0</a><br/>\nQ4: See above. </p>\n\n<p><a href=\"https://www.mulesoft.org/jira/secure/ViewProfile.jspa?name=konstantin.babushkin\" class=\"user-hover\" rel=\"konstantin.babushkin\">Konstantin Babushkin</a><br/>\n1. There are no specific limits or settings per Environment. <br/>\n2. Switching environments is owned by CloudHub. Active Environment state is owned by CS. <br/>\n3. No, user default environment can be deleted, but then it should default to org default env which cannot be deleted. <br/>\n4. Goes to user default env, and if that doesn't exist, goes to org default env. <br/>\n5. Environments that are not empty should not be deleted. <br/>\n6. Nothing for CloudHub, that was meant for the API side (that permissions for users are tied to environments, and APIs are segemented by environments in a manner similar to how it works on CH). </p>"},{"id":102713,"author":"konstantin.babushkin","authorName":"Konstantin Babushkin","avatarUrl":"https://www.mulesoft.org/jira/secure/useravatar?size=xsmall&avatarId=10132","dateTime":"2015-03-16T15:12:29-0300","dateTimeDisplay":"16/Mar/15 03:12 PM","html":"<p>1. Who owns Cloudhub specific limits/settings per Environment type and how those limits/settings are configured?<br/>\n2. Who controls Environment switching for Cloudhub and owns active Cloudhub Environment state?<br/>\n3. Does User on CoreServices side always have default Environment or not? If not who is responsible for creating and/or setting default Environment for User?<br/>\n4. How Cloudhub backend reacts on API request which have valid Basic/Bearer credentials but doesn't have EnvironmentId in request?<br/>\n5. What happens with Cloudhub objects (running workers and etc) when their Environment is deleted on CoreServices side?<br/>\n6. What does it mean particularly for Cloudhub: \"As a user, I should be able to use sub-orgs and environments in a consistent manner across both APIs and iPaaS sides of the Anypoint platform.\".</p>"},{"id":102701,"author":"dmitry.spasibenko","authorName":"Dmitry Spasibenko","avatarUrl":"https://www.mulesoft.org/jira/secure/useravatar?size=xsmall&ownerId=dmitry.spasibenko&avatarId=11235","dateTime":"2015-03-16T14:13:44-0300","dateTimeDisplay":"16/Mar/15 02:13 PM","html":"<p>Q1: where this setting should be done through the any point menu systems (like anypoint-&gt;Preferences-&gt;Organization), i.e. how user can navigate to this functionality? Also, could you please describe how this logically should look like, so as user is going to work with hierarchy of org-&gt;sub-org. I meant should user be able to edit existing sub-orgs settings? Should any org present a list of its sub-orgs? What about multi-level sub-orgs trees?</p>\n\n<p>Q2:  &gt;&gt; \"I should be able to set other preferences for the sub-org like the default region.\", can you explicitly define a list of settings that can be set right out of there except vCores and regions?</p>\n\n<p>Q3: So, the vCores number is an individual settings per sub-org and it doesn't correlate with something else like \"total vCores per all sub-orgs\", right?</p>\n\n<p>Q4: Is there some limits for vCores settings?</p>"}],"totalComments":5,"operations":{"issueKey":"ION-4161","sections":[{"groupId":"issueaction-edit-issue","operations":[{"id":"editIssue","label":"Edit","title":"Edit this issue","styleClass":"issueaction-edit-issue","url":"/jira/secure/EditIssue!default.jspa?id=72318"}]},{"groupId":"opsbar-operations","operations":[{"id":"assign-issue","label":"Assign","title":"Assign this issue to someone","styleClass":"issueaction-assign-issue","url":"/jira/secure/AssignIssue!default.jspa?id=72318"}]},{"groupId":"opsbar-operations","operations":[{"id":"greenhopper-rapidboard-operation","label":"Agile Board","title":"View this issue on an Agile board","styleClass":"issueaction-greenhopper-rapidboard-operation js-rapidboard-operation-issue","url":"/jira/secure/GHGoToBoard.jspa?issueId=72318"},{"id":"greenhopper-rank-top-operation","label":"Rank to Top","title":"","styleClass":"issueaction-greenhopper-rank-top-operation","url":"/jira/secure/RankTop.jspa?issueId=72318"},{"id":"greenhopper-rank-bottom-operation","label":"Rank to Bottom","title":"","styleClass":"issueaction-greenhopper-rank-bottom-operation","url":"/jira/secure/RankBottom.jspa?issueId=72318"}]},{"groupId":"opsbar-operations","operations":[{"id":"log-work","label":"Log Work","title":"Log work against this issue","styleClass":"issueaction-log-work","url":"/jira/secure/CreateWorklog!default.jspa?id=72318"}]},{"groupId":"opsbar-operations","operations":[{"id":"attach-file","label":"Attach Files","title":"Attach one or more files to this issue","styleClass":"issueaction-attach-file","url":"/jira/secure/AttachFile!default.jspa?id=72318"},{"id":"attach-screenshot-html5","label":"Attach Screenshot","title":"","styleClass":"issueaction-attach-image","url":"/jira/secure/ShowAttachScreenshotFormAction!default.jspa?id=72318"}]},{"groupId":"opsbar-operations","operations":[{"id":"toggle-vote-issue","label":"Add Vote","title":"Vote for this issue","styleClass":"issueaction-vote-issue","url":"/jira/secure/VoteOrWatchIssue.jspa?atl_token=AIRR-S9AY-TEC8-BYOT|e69e2cfbfb2d0929ff9ed34f08f9d14260b2cb2e|lin&id=72318&vote=vote"},{"id":"view-voters","label":"Voters","title":"View voters for this issue","styleClass":"issueaction-view-voters","url":"/jira/secure/ViewVoters!default.jspa?id=72318"},{"id":"toggle-watch-issue","label":"Watch Issue","title":"Start watching this issue","styleClass":"issueaction-watch-issue","url":"/jira/secure/VoteOrWatchIssue.jspa?atl_token=AIRR-S9AY-TEC8-BYOT|e69e2cfbfb2d0929ff9ed34f08f9d14260b2cb2e|lin&id=72318&watch=watch"},{"id":"manage-watchers","label":"Watchers","title":"Manage the watchers of this issue","styleClass":"issueaction-manage-watchers","url":"/jira/secure/ManageWatchers!default.jspa?id=72318"}]},{"groupId":"opsbar-operations","operations":[{"id":"create-subtask","label":"Create Sub-Task","title":"Create sub-task for this issue","styleClass":"issueaction-create-subtask","url":"/jira/secure/CreateSubTaskIssue!default.jspa?parentIssueId=72318"},{"id":"issue-to-subtask","label":"Convert to Sub-Task","title":"Convert this issue to sub-task","styleClass":"issueaction-issue-to-subtask","url":"/jira/secure/ConvertIssue.jspa?id=72318"}]},{"groupId":"opsbar-operations","operations":[{"id":"move-issue","label":"Move","title":"Move this issue to another project or issue type.","styleClass":"issueaction-move-issue","url":"/jira/secure/MoveIssue!default.jspa?id=72318"},{"id":"link-issue","label":"Link","title":"Link this issue to another issue or item","styleClass":"issueaction-link-issue","url":"/jira/secure/LinkJiraIssue!default.jspa?id=72318"},{"id":"clone-issue","label":"Clone","title":"Clone this issue","styleClass":"issueaction-clone-issue","url":"/jira/secure/CloneIssueDetails!default.jspa?id=72318"},{"id":"edit-labels","label":"Labels","title":"Edit this issue's labels","styleClass":"issueaction-edit-labels","url":"/jira/secure/EditLabels!default.jspa?id=72318"}]},{"groupId":"opsbar-operations","operations":[{"id":"delete-issue","label":"Delete","title":"Delete this issue","styleClass":"issueaction-delete-issue","url":"/jira/secure/DeleteIssue!default.jspa?id=72318"}]},{"groupId":"opsbar-transitions","operations":[{"id":"action_id_91","label":"QA Failed","title":"","styleClass":"issueaction-workflow-transition","url":"/jira/secure/WorkflowUIDispatcher.jspa?id=72318&action=91&atl_token="},{"id":"action_id_101","label":"QA Passed","title":"","styleClass":"issueaction-workflow-transition","url":"/jira/secure/WorkflowUIDispatcher.jspa?id=72318&action=101&atl_token="},{"id":"action_id_171","label":"QA Blocked","title":"","styleClass":"issueaction-workflow-transition","url":"/jira/secure/WorkflowUIDispatcher.jspa?id=72318&action=171&atl_token="},{"id":"action_id_261","label":"Reject","title":"","styleClass":"issueaction-workflow-transition","url":"/jira/secure/WorkflowUIDispatcher.jspa?id=72318&action=261&atl_token="}]}]},"avatarUrl":"https://www.mulesoft.org/jira/secure/useravatar?avatarId=10153","priorityUrl":"http://images.mulesource.org/question_small.png","priorityName":"To be reviewed","typeName":"Story","typeId":"13","typeUrl":"https://www.mulesoft.org/jira/images/icons/issuetypes/story.png","projectName":"CloudHub","projectAvatarUrl":"https://www.mulesoft.org/jira/secure/projectavatar?pid=10462&avatarId=10733","isAssigned":false,"attachments":{"issueId":72318,"totalCount":0,"fileAttachments":[],"imageAttachments":[]},"subtasks":[],"totalSubtaskCount":0,"primaryStatisticFieldId":"customfield_10203","sprint":{"id":695,"sequence":676,"name":"Suborgs 1","state":"ACTIVE","linkedPagesCount":0},"issueLinks":{"linkingEnabled":true,"defaultLinkIcon":"/jira/images/icons/generic_link_16.png","canLink":true,"hasIssueLinks":true,"issueLinkTypeEntries":[{"relationship":"is blocked by","issueLinkEntries":[{"htmlElementId":"internal-73800_10001","deleteUrl":"/jira/secure/DeleteLink.jspa?id=72318&sourceId=73800&linkType=10001","remote":false,"requiresAsyncLoading":false,"linkIcon":{"url":"/jira/images/icons/issuetypes/bug.png","alt":"Bug - A problem which impairs or prevents the functions of the product."},"priorityIcon":{"url":"/jira/images/icons/priorities/blocker.png","alt":"Blocker - Blocks development and/or testing work, production could not run."},"statusIcon":{"url":"/jira/images/icons/statuses/generic.png","alt":"Rejected - "},"tooltip":"ION-4195: Environments - Unable to access Cloudhub with org user (not org admin) that has no default environment","url":"/jira/browse/ION-4195","resolved":true,"title":"ION-4195","summary":"Environments - Unable to access Cloudhub with org user (not org admin) that has no default environment","status":{"id":"10021","name":"Rejected","description":"","iconUrl":"https://www.mulesoft.org/jira/images/icons/statuses/generic.png","statusCategory":{"id":"4","key":"indeterminate","colorName":"yellow"}}}]}]},"tabs":{"thirdPartyTabs":[{"iconURL":"https://www.mulesoft.org/jira/s/en_UK43oebj/6329/13/2.2.6/_/download/resources/com.atlassian.jira.plugins.jira-development-integration-plugin:greenhopper-devstatus-panel/icon.png","toolTip":"Development","label":"Development","providerKey":"com.atlassian.jira.plugins.jira-development-integration-plugin:greenhopper-devstatus-panel","html":"<ul id=\"devstatus-container\" class=\"item-details dev-status-container\" data-labs-json=\"{&quot;allowed&quot;:false,&quot;optedIn&quot;:true,&quot;optedInByAdmin&quot;:true,&quot;dismissed&quot;:false,&quot;id&quot;:1}\" data-show-contact-admin-form=\"true\" data-issue-type=\"Story\" data-issue-status=\"To Be Reviewed\" data-is-assignable=\"true\" data-is-assignee=\"false\" ><div class=\"hidden dev-summary json-blob\" data-json=\"{&quot;cachedValue&quot;:{&quot;errors&quot;:[],&quot;configErrors&quot;:[],&quot;summary&quot;:{&quot;repository&quot;:{&quot;overall&quot;:{&quot;count&quot;:0,&quot;lastUpdated&quot;:null},&quot;byInstanceType&quot;:{}},&quot;deployment-environment&quot;:{&quot;overall&quot;:{&quot;count&quot;:0,&quot;lastUpdated&quot;:null,&quot;topEnvironments&quot;:[],&quot;showProjects&quot;:false,&quot;successfulCount&quot;:0},&quot;byInstanceType&quot;:{}},&quot;pullrequest&quot;:{&quot;overall&quot;:{&quot;count&quot;:0,&quot;lastUpdated&quot;:null,&quot;stateCount&quot;:0,&quot;state&quot;:&quot;OPEN&quot;},&quot;byInstanceType&quot;:{}},&quot;branch&quot;:{&quot;overall&quot;:{&quot;count&quot;:0,&quot;lastUpdated&quot;:null},&quot;byInstanceType&quot;:{}},&quot;build&quot;:{&quot;overall&quot;:{&quot;count&quot;:0,&quot;lastUpdated&quot;:null,&quot;failedBuildCount&quot;:0,&quot;successfulBuildCount&quot;:0,&quot;unknownBuildCount&quot;:0},&quot;byInstanceType&quot;:{}},&quot;review&quot;:{&quot;overall&quot;:{&quot;count&quot;:0,&quot;lastUpdated&quot;:null,&quot;stateCount&quot;:0,&quot;state&quot;:null,&quot;dueDate&quot;:null,&quot;overDue&quot;:false},&quot;byInstanceType&quot;:{}}}},&quot;isStale&quot;:false}\"></div><ul class=\"item-details status-panels devstatus-entry\"><li class=\"status-panel hidden\" id=\"branch-status-panel\" data-module=\"BranchModule\"></li><li class=\"status-panel hidden\" id=\"commit-status-panel\" data-module=\"CommitModule\"></li><li class=\"status-panel hidden\" id=\"pullrequest-status-panel\" data-module=\"PullRequestModule\"></li><li class=\"status-panel hidden\" id=\"review-status-panel\" data-module=\"ReviewModule\"></li><li class=\"status-panel hidden\" id=\"build-status-panel\" data-module=\"BuildModule\" data-issue-type=\"Story\" data-issue-status=\"To Be Reviewed\" data-is-assignee=\"false\"></li><li class=\"status-panel deployment-summary hidden\" id=\"deployment-status-panel\" data-module=\"DeploymentModule\" data-issue-type=\"Story\" data-issue-status=\"To Be Reviewed\" data-is-assignee=\"false\"></li></ul><li class=\"call-to-actions devstatus-entry hidden\"></li><li class=\"message-panel hidden\"></li><li class=\"labs-on-off-container hidden\"></li></ul>"}]},"color":"#b3f290","flagged":false};
  var originalnext= {"key":"ION-4201","id":73949,"editable":true,"canCreateComment":true,"isSubtask":false,"fields":[{"id":"issuekey","label":"issue.key","editable":false,"renderer":"text","text":"ION-4201"},{"id":"summary","label":"Summary","editable":true,"type":"textarea","renderer":"text","text":"Handle SocketException during Application deployment (try doing retry a few times)"},{"id":"description","label":"Description","editable":true,"type":"textarea","renderer":"html","html":"<p>Currently Cloudhub application deployer do not really try to retry application deployment if it gets some kind of exception that could be network related, like SocketException and etc. The JIRA is to implement such mechanism during application deployment, i.e. we better make a few attempts to deploy application before giving up....</p>"},{"id":"status","label":"Status","editable":false,"renderer":"status","text":"To Be Reviewed","statusEntry":{"id":"10002","name":"To Be Reviewed","description":"","iconUrl":"https://www.mulesoft.org/jira/images/icons/statuses/visible.png","statusCategory":{"id":"2","key":"new","colorName":"blue-gray"}}},{"id":"components","label":"Component/s","editable":false,"renderer":"text","text":"Platform"},{"id":"labels","label":"Labels","editable":false,"renderer":"text"},{"id":"versions","label":"Affects Version/s","editable":false,"renderer":"text"},{"id":"fixVersions","label":"Fix Version/s","editable":false,"renderer":"text","text":"Release 42"},{"id":"issuelinks","label":"Linked Issues","editable":false,"type":"text","renderer":"html","category":"links","html":""},{"id":"reporter","label":"Reporter","editable":false,"renderer":"html","html":"Konstantin Babushkin"},{"id":"assignee","label":"Assignee","editable":false,"renderer":"html","html":"Unassigned"},{"id":"created","label":"Created","editable":false,"renderer":"date","html":"10/Apr/15 05:16 PM","text":"2015-04-10T17:16:59-0300"},{"id":"updated","label":"Updated","editable":false,"renderer":"date","html":"13/Apr/15 09:56 PM","text":"2015-04-13T21:56:01-0300"},{"id":"customfield_10941","label":"Epic","editable":false,"renderer":"text","text":"","canRemoveEpic":false},{"id":"customfield_11345","label":"InfoSeq Implications","editable":false,"type":"text","renderer":"html","category":"details"},{"id":"customfield_10203","label":"Story Points","editable":false,"type":"number","renderer":"text"}],"comments":[{"id":104471,"author":"konstantin.babushkin","authorName":"Konstantin Babushkin","avatarUrl":"https://www.mulesoft.org/jira/secure/useravatar?size=xsmall&avatarId=10132","dateTime":"2015-04-13T21:56:01-0300","dateTimeDisplay":"13/Apr/15 09:56 PM","html":"<p>The idea of the fix is that now we have application deployment retry, i.e. if for some reason (like SocketException) deploy call (which is application zip transfer from offline to worker) will fail we should do retry for a couple of times. </p>"},{"id":104469,"author":"sebastian.gramano","authorName":"Sebastian Gramano","avatarUrl":"https://www.mulesoft.org/jira/secure/useravatar?size=xsmall&ownerId=sebastian.gramano&avatarId=11733","dateTime":"2015-04-13T21:47:57-0300","dateTimeDisplay":"13/Apr/15 09:47 PM","html":"<p>Integrated in <img src=\"https://muleion.ci.cloudbees.com/images/16x16/blue.png\" align=\"absmiddle\" border=\"0\" /> <a href=\"https://muleion.ci.cloudbees.com/job/ion-console-R42/2/\" class=\"external-link\" rel=\"nofollow\">ion-console-R42 #2</a><br/>\n     <a href=\"https://www.mulesoft.org/jira/browse/ION-4201\" title=\"Handle SocketException during Application deployment (try doing retry a few times)\" class=\"issue-link\" data-issue-key=\"ION-4201\">ION-4201</a> (Revision c64107812e2dfa4cc9f4895da347b4e0eb3f908e)</p>\n\n<p>     Result = SUCCESS</p>"}],"totalComments":2,"operations":{"issueKey":"ION-4201","sections":[{"groupId":"issueaction-edit-issue","operations":[{"id":"editIssue","label":"Edit","title":"Edit this issue","styleClass":"issueaction-edit-issue","url":"/jira/secure/EditIssue!default.jspa?id=73949"}]},{"groupId":"opsbar-operations","operations":[{"id":"assign-issue","label":"Assign","title":"Assign this issue to someone","styleClass":"issueaction-assign-issue","url":"/jira/secure/AssignIssue!default.jspa?id=73949"}]},{"groupId":"opsbar-operations","operations":[{"id":"greenhopper-rapidboard-operation","label":"Agile Board","title":"View this issue on an Agile board","styleClass":"issueaction-greenhopper-rapidboard-operation js-rapidboard-operation-issue","url":"/jira/secure/GHGoToBoard.jspa?issueId=73949"},{"id":"greenhopper-rank-top-operation","label":"Rank to Top","title":"","styleClass":"issueaction-greenhopper-rank-top-operation","url":"/jira/secure/RankTop.jspa?issueId=73949"},{"id":"greenhopper-rank-bottom-operation","label":"Rank to Bottom","title":"","styleClass":"issueaction-greenhopper-rank-bottom-operation","url":"/jira/secure/RankBottom.jspa?issueId=73949"}]},{"groupId":"opsbar-operations","operations":[{"id":"log-work","label":"Log Work","title":"Log work against this issue","styleClass":"issueaction-log-work","url":"/jira/secure/CreateWorklog!default.jspa?id=73949"}]},{"groupId":"opsbar-operations","operations":[{"id":"attach-file","label":"Attach Files","title":"Attach one or more files to this issue","styleClass":"issueaction-attach-file","url":"/jira/secure/AttachFile!default.jspa?id=73949"},{"id":"attach-screenshot-html5","label":"Attach Screenshot","title":"","styleClass":"issueaction-attach-image","url":"/jira/secure/ShowAttachScreenshotFormAction!default.jspa?id=73949"}]},{"groupId":"opsbar-operations","operations":[{"id":"toggle-vote-issue","label":"Add Vote","title":"Vote for this issue","styleClass":"issueaction-vote-issue","url":"/jira/secure/VoteOrWatchIssue.jspa?atl_token=AIRR-S9AY-TEC8-BYOT|e69e2cfbfb2d0929ff9ed34f08f9d14260b2cb2e|lin&id=73949&vote=vote"},{"id":"view-voters","label":"Voters","title":"View voters for this issue","styleClass":"issueaction-view-voters","url":"/jira/secure/ViewVoters!default.jspa?id=73949"},{"id":"toggle-watch-issue","label":"Watch Issue","title":"Start watching this issue","styleClass":"issueaction-watch-issue","url":"/jira/secure/VoteOrWatchIssue.jspa?atl_token=AIRR-S9AY-TEC8-BYOT|e69e2cfbfb2d0929ff9ed34f08f9d14260b2cb2e|lin&id=73949&watch=watch"},{"id":"manage-watchers","label":"Watchers","title":"Manage the watchers of this issue","styleClass":"issueaction-manage-watchers","url":"/jira/secure/ManageWatchers!default.jspa?id=73949"}]},{"groupId":"opsbar-operations","operations":[{"id":"create-subtask","label":"Create Sub-Task","title":"Create sub-task for this issue","styleClass":"issueaction-create-subtask","url":"/jira/secure/CreateSubTaskIssue!default.jspa?parentIssueId=73949"},{"id":"issue-to-subtask","label":"Convert to Sub-Task","title":"Convert this issue to sub-task","styleClass":"issueaction-issue-to-subtask","url":"/jira/secure/ConvertIssue.jspa?id=73949"}]},{"groupId":"opsbar-operations","operations":[{"id":"move-issue","label":"Move","title":"Move this issue to another project or issue type.","styleClass":"issueaction-move-issue","url":"/jira/secure/MoveIssue!default.jspa?id=73949"},{"id":"link-issue","label":"Link","title":"Link this issue to another issue or item","styleClass":"issueaction-link-issue","url":"/jira/secure/LinkJiraIssue!default.jspa?id=73949"},{"id":"clone-issue","label":"Clone","title":"Clone this issue","styleClass":"issueaction-clone-issue","url":"/jira/secure/CloneIssueDetails!default.jspa?id=73949"},{"id":"edit-labels","label":"Labels","title":"Edit this issue's labels","styleClass":"issueaction-edit-labels","url":"/jira/secure/EditLabels!default.jspa?id=73949"}]},{"groupId":"opsbar-operations","operations":[{"id":"delete-issue","label":"Delete","title":"Delete this issue","styleClass":"issueaction-delete-issue","url":"/jira/secure/DeleteIssue!default.jspa?id=73949"}]},{"groupId":"opsbar-transitions","operations":[{"id":"action_id_91","label":"QA Failed","title":"","styleClass":"issueaction-workflow-transition","url":"/jira/secure/WorkflowUIDispatcher.jspa?id=73949&action=91&atl_token="},{"id":"action_id_101","label":"QA Passed","title":"","styleClass":"issueaction-workflow-transition","url":"/jira/secure/WorkflowUIDispatcher.jspa?id=73949&action=101&atl_token="},{"id":"action_id_171","label":"QA Blocked","title":"","styleClass":"issueaction-workflow-transition","url":"/jira/secure/WorkflowUIDispatcher.jspa?id=73949&action=171&atl_token="},{"id":"action_id_261","label":"Reject","title":"","styleClass":"issueaction-workflow-transition","url":"/jira/secure/WorkflowUIDispatcher.jspa?id=73949&action=261&atl_token="}]}]},"avatarUrl":"https://www.mulesoft.org/jira/secure/useravatar?avatarId=10153","priorityUrl":"http://images.mulesource.org/question_small.png","priorityName":"To be reviewed","typeName":"Improvement","typeId":"4","typeUrl":"https://www.mulesoft.org/jira/images/icons/issuetypes/improvement.png","projectName":"CloudHub","projectAvatarUrl":"https://www.mulesoft.org/jira/secure/projectavatar?pid=10462&avatarId=10733","isAssigned":false,"attachments":{"issueId":73949,"totalCount":0,"fileAttachments":[],"imageAttachments":[]},"subtasks":[],"totalSubtaskCount":0,"primaryStatisticFieldId":"customfield_10203","sprint":{"id":695,"sequence":676,"name":"Suborgs 1","state":"ACTIVE","linkedPagesCount":0},"issueLinks":{"linkingEnabled":true,"defaultLinkIcon":"/jira/images/icons/generic_link_16.png","canLink":true,"hasIssueLinks":false,"issueLinkTypeEntries":[]},"tabs":{"thirdPartyTabs":[{"iconURL":"https://www.mulesoft.org/jira/s/en_UK43oebj/6329/13/2.2.6/_/download/resources/com.atlassian.jira.plugins.jira-development-integration-plugin:greenhopper-devstatus-panel/icon.png","toolTip":"Development","label":"Development","providerKey":"com.atlassian.jira.plugins.jira-development-integration-plugin:greenhopper-devstatus-panel","html":"<ul id=\"devstatus-container\" class=\"item-details dev-status-container\" data-labs-json=\"{&quot;allowed&quot;:false,&quot;optedIn&quot;:true,&quot;optedInByAdmin&quot;:true,&quot;dismissed&quot;:false,&quot;id&quot;:1}\" data-show-contact-admin-form=\"true\" data-issue-type=\"Improvement\" data-issue-status=\"To Be Reviewed\" data-is-assignable=\"true\" data-is-assignee=\"false\" ><div class=\"hidden dev-summary json-blob\" data-json=\"{&quot;cachedValue&quot;:{&quot;errors&quot;:[],&quot;configErrors&quot;:[],&quot;summary&quot;:{&quot;repository&quot;:{&quot;overall&quot;:{&quot;count&quot;:2,&quot;lastUpdated&quot;:&quot;2015-04-13T21:28:42.000-0300&quot;},&quot;byInstanceType&quot;:{&quot;github&quot;:{&quot;count&quot;:2,&quot;name&quot;:&quot;GitHub&quot;}}},&quot;deployment-environment&quot;:{&quot;overall&quot;:{&quot;count&quot;:0,&quot;lastUpdated&quot;:null,&quot;topEnvironments&quot;:[],&quot;showProjects&quot;:false,&quot;successfulCount&quot;:0},&quot;byInstanceType&quot;:{}},&quot;pullrequest&quot;:{&quot;overall&quot;:{&quot;count&quot;:1,&quot;lastUpdated&quot;:&quot;2015-04-13T21:28:43.000-0300&quot;,&quot;stateCount&quot;:1,&quot;state&quot;:&quot;MERGED&quot;},&quot;byInstanceType&quot;:{&quot;github&quot;:{&quot;count&quot;:1,&quot;name&quot;:&quot;GitHub&quot;}}},&quot;branch&quot;:{&quot;overall&quot;:{&quot;count&quot;:1,&quot;lastUpdated&quot;:null},&quot;byInstanceType&quot;:{&quot;github&quot;:{&quot;count&quot;:1,&quot;name&quot;:&quot;GitHub&quot;}}},&quot;build&quot;:{&quot;overall&quot;:{&quot;count&quot;:0,&quot;lastUpdated&quot;:null,&quot;failedBuildCount&quot;:0,&quot;successfulBuildCount&quot;:0,&quot;unknownBuildCount&quot;:0},&quot;byInstanceType&quot;:{}},&quot;review&quot;:{&quot;overall&quot;:{&quot;count&quot;:0,&quot;lastUpdated&quot;:null,&quot;stateCount&quot;:0,&quot;state&quot;:null,&quot;dueDate&quot;:null,&quot;overDue&quot;:false},&quot;byInstanceType&quot;:{}}}},&quot;isStale&quot;:true}\"></div><ul class=\"item-details status-panels devstatus-entry\"><li class=\"status-panel hidden\" id=\"branch-status-panel\" data-module=\"BranchModule\"></li><li class=\"status-panel hidden\" id=\"commit-status-panel\" data-module=\"CommitModule\"></li><li class=\"status-panel hidden\" id=\"pullrequest-status-panel\" data-module=\"PullRequestModule\"></li><li class=\"status-panel hidden\" id=\"review-status-panel\" data-module=\"ReviewModule\"></li><li class=\"status-panel hidden\" id=\"build-status-panel\" data-module=\"BuildModule\" data-issue-type=\"Improvement\" data-issue-status=\"To Be Reviewed\" data-is-assignee=\"false\"></li><li class=\"status-panel deployment-summary hidden\" id=\"deployment-status-panel\" data-module=\"DeploymentModule\" data-issue-type=\"Improvement\" data-issue-status=\"To Be Reviewed\" data-is-assignee=\"false\"></li></ul><li class=\"call-to-actions devstatus-entry hidden\"></li><li class=\"message-panel hidden\"></li><li class=\"labs-on-off-container hidden\"></li></ul>"}]},"color":"#009900","flagged":false};

  var toSend = [parseItem(originalCurrent),
                parseItem(originalnext)];

  return res.send(toSend);

});

var gFields = [
   {
     id :"description",
     fieldName:"html"
   },
   {
     id: "summary",
     fieldName:"text"
   },
   {
     id: "status",
     fieldName:"statusEntry"
   },
   {
     id: "components",
     fieldName:"text"
   },
   {
     id: "reporter",
     fieldName:"html"
   },
   {
     id: "assignee",
     fieldName:"html"
   }
];

function parseItem(item){
  var ret = {
    id: item.id,
    key: item.key,
    comments: item.comments,
    totalComments: item.totalComments,
    avatarUrl: item.avatarUrl,
    priorityUrl: item.priorityUrl,
    priorityName: item.priorityName,
    typeName: item.typeName,
    typeId: item.typeId,
    typeUrl: item.typeUrl,
    projectName: item.projectName,
    projectAvatarUrl: item.projectAvatarUrl,
    isAssigned: item.isAssigned,
    attachments: item.attachments
  }

  _.each(item.fields, function(field){
    var found = _.find(gFields, _.matchesProperty("id", field.id));

    if(found){
      ret[found.id] = field[found.fieldName];
    }

  })

  return ret;
}


app.get('/backlog', function(req, res, next) {

  var options = {
    url: 'https://www.mulesoft.org/jira/rest/greenhopper/1.0/xboard/plan/backlog/data.json?rapidViewId=53&_=1430142451426',
    auth: {
      user: "dario.carabajal",
      pass: "crdNatg18",
      sendImmediately: true
    }
  }

  request.get(options,
  function (error, response, body) {
    if (!error && response.statusCode == 200) {
      body = JSON.parse(body);
      return res.send(parsebacklog(body));
    }
  });

})

function parsebacklog(body){
  var ret = {
    sprints: [],
    backlog: [],
    projects: [],
    epicData: []
  }

  ret.sprints = body.sprints

  ret.sprints = _.transform(ret.sprints, function(retSprint, sprint){
    sprint["issues"] = [];

    _.each(sprint.issuesIds, function(n){

      sprint["issues"].push(
        _.remove(body.issues, {id: n})[0]
      )
    });

    sprint = _.omit(sprint, "issuesIds")

    retSprint.push(sprint);

  });

  ret.backlog = body.issues;
  ret.projects = body.projects;
  ret.epicData = body.epicData;

  return ret;
}


module.exports = app;