/**
 * Localisation française centralisée.
 *
 * IMPORTANT : ce module ne modifie jamais les identifiants techniques Discord
 * (customId, noms de commandes, values de menus, IDs, URLs, etc.).
 * Il ne traduit que les textes affichés aux utilisateurs.
 *
 * Le précédent patch de StringSelectMenuBuilder.addOptions() a été retiré :
 * il pouvait transformer des builders Discord.js en objets invalides et
 * déclencher les erreurs @sapphire/shapeshift "Received one or more errors".
 */
import {
  EmbedBuilder,
  ButtonBuilder,
  ModalBuilder,
  TextInputBuilder,
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
  SlashCommandBuilder,
  SlashCommandSubcommandBuilder,
  SlashCommandSubcommandGroupBuilder,
  SlashCommandStringOption,
  SlashCommandIntegerOption,
  SlashCommandNumberOption,
  SlashCommandBooleanOption,
  SlashCommandUserOption,
  SlashCommandChannelOption,
  SlashCommandRoleOption,
  SlashCommandMentionableOption,
  SlashCommandAttachmentOption,
} from 'discord.js';

const translations = new Map([
  // Général
  ['Yes', 'Oui'], ['No', 'Non'], ['Cancel', 'Annuler'], ['Confirm', 'Confirmer'],
  ['Close', 'Fermer'], ['Delete', 'Supprimer'], ['Remove', 'Retirer'], ['Back', 'Retour'],
  ['Refresh', 'Actualiser'], ['Save', 'Enregistrer'], ['Create', 'Créer'], ['Update', 'Mettre à jour'],
  ['Enable', 'Activer'], ['Disable', 'Désactiver'], ['Enabled', 'Activé'], ['Disabled', 'Désactivé'],
  ['Pause', 'Mettre en pause'], ['Resume', 'Reprendre'], ['Stop', 'Arrêter'], ['Skip', 'Passer'],
  ['Shuffle', 'Mélanger'], ['Loop', 'Boucle'], ['Queue', 'File d’attente'], ['Claim', 'Prendre en charge'],
  ['Claimed', 'Pris en charge'], ['Unclaim', 'Ne plus prendre en charge'], ['Pin', 'Épingler'],
  ['Low', 'Faible'], ['High', 'Élevée'], ['View', 'Voir'], ['Join', 'Rejoindre'],
  ['Reroll', 'Tirer à nouveau'], ['End', 'Terminer'], ['Next', 'Suivant'], ['Previous', 'Précédent'],
  ['Page', 'Page'], ['Status', 'État'], ['Total', 'Total'], ['Date', 'Date'], ['Time', 'Heure'],
  ['User', 'Utilisateur'], ['Users', 'Utilisateurs'], ['Channel', 'Salon'], ['Channels', 'Salons'],
  ['Role', 'Rôle'], ['Roles', 'Rôles'], ['Reason', 'Raison'], ['Settings', 'Paramètres'],
  ['Configuration', 'Configuration'], ['Success', 'Succès'], ['Error', 'Erreur'], ['Warning', 'Avertissement'],
  ['Message', 'Message'], ['Description', 'Description'], ['Name', 'Nom'], ['Value', 'Valeur'],
  ['Amount', 'Montant'], ['Duration', 'Durée'], ['Price', 'Prix'], ['Item', 'Article'], ['Items', 'Articles'],
  ['Level', 'Niveau'], ['Rank', 'Classement'], ['Leaderboard', 'Classement'], ['XP', 'XP'],
  ['Music', 'Musique'], ['Ticket', 'Ticket'], ['Tickets', 'Tickets'], ['Economy', 'Économie'],
  ['Moderation', 'Modération'], ['Verification', 'Vérification'], ['Welcome', 'Bienvenue'],
  ['Giveaway', 'Concours'], ['Birthday', 'Anniversaire'], ['Search', 'Recherche'], ['Support', 'Assistance'],
  ['Report', 'Signalement'], ['Online', 'En ligne'], ['Offline', 'Hors ligne'], ['Loading', 'Chargement'],
  ['Processing', 'Traitement en cours'], ['Completed', 'Terminé'], ['All', 'Tous'], ['None', 'Aucun'],
  ['Unknown', 'Inconnu'], ['Unknown option.', 'Option inconnue.'], ['Unknown Role', 'Rôle inconnu'],
  ['Unknown date', 'Date inconnue'], ['Not set', 'Non défini'], ['Not configured', 'Non configuré'],
  ['not configured', 'non configuré'], ['not set up', 'non configuré'], ['invalid', 'invalide'],
  ['No limit', 'Aucune limite'], ['No description', 'Aucune description'], ['No reason provided', 'Aucune raison fournie'],
  ['*(empty message)*', '*(message vide)*'],

  // Navigation / tableaux de bord
  ['Current Settings', 'Paramètres actuels'], ['Dashboard Timed Out', 'Tableau de bord expiré'],
  ['Configuration Error', 'Erreur de configuration'], ['Configuration Timeout', 'Délai de configuration dépassé'],
  ['Select a setting to configure...', 'Sélectionnez un paramètre à configurer…'],
  ['Select a configuration option', 'Sélectionnez une option de configuration'],
  ['Choose a setting to configure…', 'Choisissez un paramètre à configurer…'],
  ['Select a text channel...', 'Sélectionnez un salon textuel…'],
  ['Select a channel...', 'Sélectionnez un salon…'],
  ['Select a moderator role...', 'Sélectionnez un rôle de modération…'],
  ['Select your roles', 'Sélectionnez vos rôles'],
  ['Pick a name template...', 'Choisissez un modèle de nom…'],
  ['Select an option to configure below', 'Sélectionnez une option à configurer ci-dessous'],
  ['This action cannot be undone', 'Cette action est irréversible'],
  ['Please try again.', 'Veuillez réessayer.'],
  ['An error occurred', 'Une erreur est survenue'],
  ['An unexpected error occurred.', 'Une erreur inattendue est survenue.'],
  ['An unexpected error occurred. Please try again.', 'Une erreur inattendue est survenue. Veuillez réessayer.'],
  ['An error occurred while processing your selection.', 'Une erreur est survenue lors du traitement de votre sélection.'],
  ['This action can only be used in a server.', 'Cette action peut uniquement être utilisée sur un serveur.'],
  ['This command can only be used in a server.', 'Cette commande peut uniquement être utilisée sur un serveur.'],
  ['This command is only available as a slash command.', 'Cette commande est uniquement disponible comme commande slash.'],
  ['Not Allowed', 'Non autorisé'], ['Permission Denied', 'Permission refusée'],
  ['You do not have permission to use this command.', 'Vous n’avez pas la permission d’utiliser cette commande.'],
  ['You need **Manage Server** permission to use this command.', 'Vous avez besoin de la permission **Gérer le serveur** pour utiliser cette commande.'],
  ['You need the **Manage Server** permission to use this command.', 'Vous avez besoin de la permission **Gérer le serveur** pour utiliser cette commande.'],
  ['You need ManageGuild permission to use this command.', 'Vous avez besoin de la permission **Gérer le serveur** pour utiliser cette commande.'],
  ['❌ You need **Manage Server** permission to modify these settings.', '❌ Vous avez besoin de la permission **Gérer le serveur** pour modifier ces paramètres.'],
  ['❌ You need **Manage Server** permissions to use this.', '❌ Vous avez besoin de la permission **Gérer le serveur** pour utiliser ceci.'],
  ['Please provide a valid message ID.', 'Veuillez fournir un identifiant de message valide.'],
  ['Please select a valid subcommand.', 'Veuillez sélectionner une sous-commande valide.'],
  ['Invalid message ID format', 'Format d’identifiant de message invalide'],
  ['Invalid channel ID provided.', 'Identifiant de salon invalide.'],
  ['Invalid number format', 'Format de nombre invalide'], ['Invalid amount', 'Montant invalide'],
  ['Amount must be a positive number.', 'Le montant doit être un nombre positif.'],
  ['Amount must be positive', 'Le montant doit être positif.'],
  ['Amount must be greater than zero.', 'Le montant doit être supérieur à zéro.'],
  ['Invalid value type', 'Type de valeur invalide'], ['Invalid expression', 'Expression invalide'],
  ['No valid entries', 'Aucune entrée valide'], ['No results', 'Aucun résultat'],
  ['Target not found', 'Cible introuvable'], ['User not found', 'Utilisateur introuvable'],
  ['Role not found', 'Rôle introuvable'], ['Guild not found', 'Serveur introuvable'],
  ['Guild does not exist.', 'Le serveur n’existe pas.'],
  ['Panel channel missing', 'Salon du panneau introuvable'],

  // Bienvenue / anniversaires
  ['Welcome Channel', 'Salon de bienvenue'], ['Welcome Message', 'Message de bienvenue'],
  ['Welcome System Configured', 'Système de bienvenue configuré'], ['Configure the welcome system', 'Configurer le système de bienvenue'],
  ['Set up the welcome message', 'Configurer le message de bienvenue'],
  ['The channel to send welcome messages to', 'Le salon où envoyer les messages de bienvenue'],
  ['Welcome message. Variables:', 'Message de bienvenue. Variables :'],
  ['Whether to ping the user in the welcome message', 'Indiquer si l’utilisateur doit être mentionné dans le message de bienvenue'],
  ['🎉 Welcome!', '🎉 Bienvenue !'], ['Welcome {user} to {server}!', 'Bienvenue {user} sur {server} !'],
  ['{user.tag} has left the server.', '{user.tag} a quitté le serveur.'],
  ['AutoRole is configured', 'L’AutoRole est configuré'], ['AutoVerify is enabled', 'La vérification automatique est activée'],
  ['Birthday Set!', 'Anniversaire enregistré !'], ['Birthday Removed', 'Anniversaire supprimé'],
  ['No Birthday Found', 'Aucun anniversaire trouvé'], ['No Birthdays', 'Aucun anniversaire'],
  ['Birthday Information', 'Informations d’anniversaire'], ['Server Birthdays', 'Anniversaires du serveur'],
  ['No Upcoming Birthdays', 'Aucun anniversaire à venir'], ['Next 5 Upcoming Birthdays', 'Les 5 prochains anniversaires'],
  ['No Birthdays Found', 'Aucun anniversaire trouvé'],
  ['No birthdays have been set', 'Aucun anniversaire n’a été enregistré'],
  ['No birthdays have been set in this server yet.', 'Aucun anniversaire n’a encore été enregistré sur ce serveur.'],
  ['No birthdays have been set by current server members.', 'Aucun membre actuel du serveur n’a enregistré son anniversaire.'],
  ['No upcoming birthdays found', 'Aucun anniversaire à venir trouvé'],
  ['No upcoming birthdays found for current server members.', 'Aucun anniversaire à venir trouvé parmi les membres actuels du serveur.'],
  ['Your birthday has been set to', 'Votre anniversaire a été enregistré au'],
  ['Your birthday has been successfully removed from the server.', 'Votre anniversaire a bien été supprimé du serveur.'],
  ["You don't have a birthday set to remove.", 'Vous n’avez aucun anniversaire enregistré à supprimer.'],
  ["You haven't set your birthday yet. Use `/birthday set` to add it!", 'Vous n’avez pas encore enregistré votre anniversaire. Utilisez `/birthday set` pour l’ajouter !'],
  ['Birthday Announcements Enabled', 'Annonces d’anniversaire activées'],
  ['Birthday Announcements Disabled', 'Annonces d’anniversaire désactivées'],
  ['No channel provided — birthday announcements have been disabled.', 'Aucun salon fourni — les annonces d’anniversaire ont été désactivées.'],
  ['Set or disable the channel for birthday announcements. (Manage Server required)', 'Définir ou désactiver le salon des annonces d’anniversaire. (Permission Gérer le serveur requise)'],
  ['You need **Manage Server** permissions to configure the birthday channel.', 'Vous avez besoin de la permission **Gérer le serveur** pour configurer le salon des anniversaires.'],

  // Tickets
  ['Create a Ticket', 'Créer un ticket'], ['Create Ticket', 'Créer un ticket'], ['Close Ticket', 'Fermer le ticket'],
  ['Reopen Ticket', 'Rouvrir le ticket'], ['Delete Ticket', 'Supprimer le ticket'], ['Ticket Not Found', 'Ticket introuvable'],
  ['Ticket Created', 'Ticket créé'], ['Ticket Closed', 'Ticket fermé'], ['Ticket Reopened', 'Ticket rouvert'],
  ['Ticket Deleted', 'Ticket supprimé'], ['Ticket Claimed', 'Ticket pris en charge'], ['Ticket Unclaimed', 'Ticket non pris en charge'],
  ['Not a ticket channel', 'Ce n’est pas un salon de ticket'], ['Not claimed', 'Non pris en charge'],
  ['This ticket has been closed.', 'Ce ticket a été fermé.'], ['You have claimed this ticket.', 'Vous avez pris ce ticket en charge.'],
  ['This ticket has been unclaimed.', 'Ce ticket n’est plus pris en charge.'],
  ['This ticket will be deleted shortly.', 'Ce ticket sera bientôt supprimé.'],
  ['Click the button below to create a support ticket.', 'Cliquez sur le bouton ci-dessous pour créer un ticket d’assistance.'],
  ['Only the ticket creator can submit feedback for this ticket.', 'Seul le créateur du ticket peut envoyer un avis pour ce ticket.'],
  ['Thanks for your feedback!', 'Merci pour votre avis !'], ['Thank you for your feedback!', 'Merci pour votre avis !'],
  ['Thank you for using our support system.', 'Merci d’utiliser notre système d’assistance.'],
  ['You can always reach out again if you need further support.', 'Vous pourrez nous recontacter si vous avez besoin d’aide.'],
  ['Invalid Feedback Link', 'Lien d’avis invalide'], ['⚠️ Invalid Feedback Submission', '⚠️ Envoi d’avis invalide'],
  ['Please enter a comment before submitting your feedback.', 'Veuillez saisir un commentaire avant d’envoyer votre avis.'],
  ['Could not find the ticket associated with this feedback.', 'Impossible de trouver le ticket associé à cet avis.'],
  ['Your written feedback has been recorded. Thank you for helping us improve!', 'Votre avis écrit a été enregistré. Merci de nous aider à nous améliorer !'],
  ['This command can only be used in a valid ticket channel.', 'Cette commande peut uniquement être utilisée dans un salon de ticket valide.'],
  ['This action can only be used in a valid ticket channel.', 'Cette action peut uniquement être utilisée dans un salon de ticket valide.'],
  ['close this ticket', 'fermer ce ticket'],
  ['You must have **Manage Channels**, the configured **Ticket Staff Role**, or be the **ticket creator**.', 'Vous devez avoir **Gérer les salons**, le **rôle du personnel des tickets** configuré, ou être le **créateur du ticket**.'],
  ['You must have **Manage Channels** or the configured **Ticket Staff Role**.', 'Vous devez avoir **Gérer les salons** ou le **rôle du personnel des tickets** configuré.'],
  ['An error occurred while closing the ticket.', 'Une erreur est survenue lors de la fermeture du ticket.'],
  ['An error occurred while claiming the ticket.', 'Une erreur est survenue lors de la prise en charge du ticket.'],
  ['An error occurred while updating the priority.', 'Une erreur est survenue lors de la mise à jour de la priorité.'],
  ['Failed to pin/unpin the ticket.', 'Impossible d’épingler ou de désépingler le ticket.'],
  ['An error occurred while unclaiming the ticket.', 'Une erreur est survenue lors du retrait de la prise en charge du ticket.'],
  ['An error occurred while reopening the ticket.', 'Une erreur est survenue lors de la réouverture du ticket.'],
  ['An error occurred while deleting the ticket.', 'Une erreur est survenue lors de la suppression du ticket.'],

  // Économie
  ['Failed to load your economy data. Please try again later.', 'Impossible de charger vos données économiques. Veuillez réessayer plus tard.'],
  ['Failed to load economy data', 'Impossible de charger les données économiques'],
  ['Failed to load economy data. Please try again later.', 'Impossible de charger les données économiques. Veuillez réessayer plus tard.'],
  ['New Cash Balance', 'Nouveau solde en espèces'], ['Daily cooldown active', 'Temps d’attente quotidien actif'],
  ['Cannot pay self', 'Impossible de se payer soi-même'], ['You cannot pay yourself.', 'Vous ne pouvez pas vous payer vous-même.'],
  ['Invalid money type', 'Type de monnaie invalide'], ['No player', 'Aucun joueur'],
  ['Daily', 'Quotidien'], ['Work', 'Travail'], ['Buy', 'Acheter'], ['Sell', 'Vendre'], ['Balance', 'Solde'],
  ['Inventory', 'Inventaire'], ['Deposit', 'Déposer'], ['Withdraw', 'Retirer'], ['Pay', 'Payer'],
  ['You are currently on cooldown.', 'Vous êtes actuellement en période d’attente.'],
  ['Amount must be greater than zero.', 'Le montant doit être supérieur à zéro.'],

  // Modération
  ['Manage user notes for moderation purposes', 'Gérer les notes utilisateur à des fins de modération'],
  ['View all warnings for a user', 'Voir tous les avertissements d’un utilisateur'],
  ['Warn a user', 'Avertir un utilisateur'], ['Ban a user from the server', 'Bannir un utilisateur du serveur'],
  ['Unban a user from the server', 'Débannir un utilisateur du serveur'], ['Kick a user from the server', 'Expulser un utilisateur du serveur'],
  ['Remove timeout from a user', 'Retirer l’exclusion temporaire d’un utilisateur'],
  ['Timeout a user for a specific duration.', 'Exclure temporairement un utilisateur pour une durée donnée.'],
  ['Delete a specific amount of messages', 'Supprimer un nombre défini de messages'],
  ['Send a plain message as the bot', 'Envoyer un message simple en tant que bot'],
  ['View moderation cases and audit logs', 'Voir les cas de modération et les journaux d’audit'],
  ['The user to ban', 'L’utilisateur à bannir'], ['The user to kick', 'L’utilisateur à expulser'],
  ['User to warn', 'L’utilisateur à avertir'], ['User to timeout', 'L’utilisateur à exclure temporairement'],
  ['Reason for the ban', 'Raison du bannissement'], ['Reason for the kick', 'Raison de l’expulsion'],
  ['Reason for the warning', 'Raison de l’avertissement'], ['Reason for the timeout', 'Raison de l’exclusion temporaire'],
  ['You must specify a user to timeout.', 'Vous devez indiquer un utilisateur à exclure temporairement.'],
  ['Cannot timeout self', 'Impossible de vous exclure temporairement vous-même'], ['You cannot timeout yourself.', 'Vous ne pouvez pas vous exclure temporairement vous-même.'],
  ['Cannot timeout bot', 'Impossible d’exclure temporairement le bot'], ['You cannot timeout the bot.', 'Vous ne pouvez pas exclure temporairement le bot.'],
  ['You must specify a user to warn.', 'Vous devez indiquer un utilisateur à avertir.'],
  ['Missing warning reason', 'Raison de l’avertissement manquante'], ['You must provide a reason for the warning.', 'Vous devez fournir une raison pour l’avertissement.'],
  ['You must specify a user to kick.', 'Vous devez indiquer un utilisateur à expulser.'], ['Cannot kick self', 'Impossible de vous expulser vous-même'],
  ['You cannot kick yourself.', 'Vous ne pouvez pas vous expulser vous-même.'], ['Cannot kick bot', 'Impossible d’expulser le bot'],
  ['You cannot kick the bot.', 'Vous ne pouvez pas expulser le bot.'], ['You must specify a user to ban.', 'Vous devez indiquer un utilisateur à bannir.'],
  ['Cannot ban self', 'Impossible de vous bannir vous-même'], ['You cannot ban yourself.', 'Vous ne pouvez pas vous bannir vous-même.'],
  ['Cannot ban bot', 'Impossible de bannir le bot'], ['You cannot ban the bot.', 'Vous ne pouvez pas bannir le bot.'],
  ['User is not in this server.', 'L’utilisateur n’est pas présent sur ce serveur.'],
  ['The specified user is not in this server.', 'L’utilisateur indiqué n’est pas présent sur ce serveur.'],
  ['The target user is not currently in this server.', 'L’utilisateur ciblé n’est actuellement pas présent sur ce serveur.'],
  ['Target not found', 'Cible introuvable'], ['Missing target user', 'Utilisateur cible manquant'],
  ['You cannot use these buttons. Run `/cases` to get your own case view.', 'Vous ne pouvez pas utiliser ces boutons. Exécutez `/cases` pour afficher vos propres cas.'],
  ['Moderation Cases', 'Cas de modération'], ['All Cases', 'Tous les cas'],
  ['No moderation cases found for this user.', 'Aucun cas de modération trouvé pour cet utilisateur.'],
  ['No reason provided', 'Aucune raison fournie'],
  ['Clear All Warnings', 'Effacer tous les avertissements'], ['Delete Specific Warning', 'Supprimer un avertissement précis'],
  ['This user has no recorded warnings.', 'Cet utilisateur n’a aucun avertissement enregistré.'],
  ['The ID (or mention) of the user to unban', 'Identifiant (ou mention) de l’utilisateur à débannir'],
  ['Reason for the unban', 'Raison du débannissement'], ['Please provide a valid user ID or mention.', 'Veuillez fournir un identifiant utilisateur ou une mention valide.'],
  ['✅ User Unbanned', '✅ Utilisateur débanni'], ['Message from the Staff Team', 'Message de l’équipe du personnel'],

  // Musique
  ['Nothing is playing right now.', 'Aucune musique n’est en cours de lecture.'], ['No active music player.', 'Aucun lecteur audio actif.'],
  ['Empty queue', 'File d’attente vide'], ['The queue is empty.', 'La file d’attente est vide.'],
  ['Music is unavailable — Lavalink is not configured.', 'La musique est indisponible — Lavalink n’est pas configuré.'],
  ['No results', 'Aucun résultat'], ['Invalid index', 'Index invalide'], ['Now Playing', 'Lecture en cours'],
  ['Playing', 'Lecture en cours'], ['Paused', 'En pause'], ['Song', 'Musique'], ['Track', 'Piste'],
  ['No player', 'Aucun lecteur'], ['Voice Channel', 'Salon vocal'],

  // Concours
  ['Starts a new giveaway in a specified channel.', 'Lancer un nouveau concours dans le salon indiqué.'],
  ['Rerolls the winner(s) for an ended giveaway.', 'Tirer de nouveau le ou les gagnants d’un concours terminé.'],
  ['The message ID of the ended giveaway.', 'L’identifiant du message du concours terminé.'],
  ['The message ID of the giveaway to end.', 'L’identifiant du message du concours à terminer.'],
  ['The message ID of the giveaway to delete.', 'L’identifiant du message du concours à supprimer.'],
  ['The number of winners to pick.', 'Le nombre de gagnants à tirer.'], ['The prize being given away.', 'Le lot à faire gagner.'],
  ['This giveaway has already ended.', 'Ce concours est déjà terminé.'], ['This giveaway is no longer active.', 'Ce concours n’est plus actif.'],
  ['Giveaway not found in database', 'Concours introuvable dans la base de données'],
  ['🎉 **GIVEAWAY ENDED** 🎉', '🎉 **CONCOURS TERMINÉ** 🎉'], ['👥 Total Entries', '👥 Participations totales'],
  ['🔄 **GIVEAWAY REROLLED** 🔄', '🔄 **GAGNANT(S) RETIRÉ(S) À NOUVEAU** 🔄'],
  ['React with the button below to enter!', 'Cliquez sur le bouton ci-dessous pour participer !'],

  // Journalisation / statistiques / candidatures
  ['Logging Dashboard', 'Tableau de bord des journaux'], ['Event Categories', 'Catégories d’événements'],
  ['Log Ignore Filters', 'Filtres d’exclusion des journaux'], ['Audit Logging', 'Journalisation d’audit'],
  ['Manage server logging', 'Gérer la journalisation du serveur'], ['Open the logging dashboard', 'Ouvrir le tableau de bord des journaux'],
  ['Log Channel', 'Salon de journalisation'], ['Add User Filter', 'Ajouter un filtre utilisateur'], ['Add Channel Filter', 'Ajouter un filtre de salon'],
  ['Application Retention Periods', 'Périodes de conservation des candidatures'],
  ['Remove Application Role', 'Retirer le rôle de candidature'], ['Application Deleted', 'Candidature supprimée'],
  ['Application Role', 'Rôle de candidature'], ['Application Enabled', 'Candidature activée'], ['Applications are disabled', 'Les candidatures sont désactivées'],
  ['Applications are currently disabled in this server.', 'Les candidatures sont actuellement désactivées sur ce serveur.'],
  ['You already have a pending application. Please wait for it to be reviewed.', 'Vous avez déjà une candidature en attente. Veuillez patienter pendant son examen.'],
  ['Application not found', 'Candidature introuvable'], ['Role Removed', 'Rôle retiré'],
  ['This application will no longer appear in `/apply submit` options.', 'Cette candidature n’apparaîtra plus dans les options de `/apply submit`.'],
  ['This application will now appear in `/apply submit` options.', 'Cette candidature apparaîtra désormais dans les options de `/apply submit`.'],
  ['Server statistics', 'Statistiques du serveur'], ['Channel Updated', 'Salon mis à jour'],
  ['Manage server statistics that track member counts and channel data', 'Gérer les statistiques du serveur (membres et salons)'],
  ['Create a new statistics tracker channel in a category', 'Créer un salon de suivi statistique dans une catégorie'],
  ['List all statistics trackers for this server', 'Lister tous les suivis statistiques de ce serveur'],
  ['Update an existing statistics tracker', 'Mettre à jour un suivi statistique existant'],
  ['Delete an existing statistics tracker', 'Supprimer un suivi statistique existant'],

  // Configuration / Join to Create
  ['Manage Join to Create voice channels system.', 'Gérer le système de salons vocaux « Rejoindre pour créer ».'],
  ['Set up a new Join to Create voice channel.', 'Configurer un nouveau salon vocal « Rejoindre pour créer ».'],
  ['Configure an existing Join to Create system.', 'Configurer un système « Rejoindre pour créer » existant.'],
  ['Bitrate for temporary channels in kbps (8-96).', 'Débit audio des salons temporaires en kbps (8-96).'],
  ['The Join to Create trigger channel to configure.', 'Le salon déclencheur « Rejoindre pour créer » à configurer.'],
  ['Guild already has a Join to Create channel', 'Le serveur possède déjà un salon « Rejoindre pour créer »'],
  ['Creating Join to Create trigger channel...', 'Création du salon déclencheur « Rejoindre pour créer »…'],
  ['Initialized Join to Create', 'Système « Rejoindre pour créer » initialisé'],
  ['Use the buttons below to modify settings • Only one trigger channel is supported per guild', 'Utilisez les boutons ci-dessous pour modifier les paramètres • Un seul salon déclencheur est pris en charge par serveur'],
  ['📝 Name Template', '📝 Modèle de nom'], ['👥 User Limit', '👥 Limite d’utilisateurs'], ['🗑️ Remove Channel', '🗑️ Supprimer le salon'],
  ['Channel name template', 'Modèle de nom du salon'], ['Updated channel name template', 'Modèle de nom du salon mis à jour'],
  ['Configure User Limit', 'Configurer la limite d’utilisateurs'], ['Enter user limit (0-99, 0 = unlimited)', 'Saisissez la limite d’utilisateurs (0-99, 0 = illimité)'],
  ['Updated user limit', 'Limite d’utilisateurs mise à jour'], ['Current Channel Name Template', 'Modèle de nom du salon actuel'],
  ['Current User Limit', 'Limite d’utilisateurs actuelle'], ['Change Channel Name Template', 'Modifier le modèle de nom du salon'],
  ['Modify the template for temporary channel names', 'Modifier le modèle des noms de salons temporaires'],
  ['Change User Limit', 'Modifier la limite d’utilisateurs'], ['Set maximum users per temporary channel', 'Définir le nombre maximal d’utilisateurs par salon temporaire'],
  ['Adjust audio quality for temporary channels', 'Ajuster la qualité audio des salons temporaires'],
  ['Remove This Trigger Channel', 'Supprimer ce salon déclencheur'], ['Remove this channel from the Join to Create system', 'Supprimer ce salon du système « Rejoindre pour créer »'],
  ['View Current Settings', 'Voir les paramètres actuels'], ['Show all current configuration details', 'Afficher tous les détails de configuration actuels'],
  ['Channel Name Template Configuration', 'Configuration du modèle de nom du salon'],
  ['Please enter the new channel name template.', 'Veuillez saisir le nouveau modèle de nom du salon.'],
  ['Current Template', 'Modèle actuel'], ['User Limit Configuration', 'Configuration de la limite d’utilisateurs'],
  ['Please enter the new user limit (0-99, where 0 = no limit).', 'Veuillez saisir la nouvelle limite d’utilisateurs (0-99, où 0 = aucune limite).'],
  ['Current Limit', 'Limite actuelle'], ['Type the new limit in the chat below', 'Saisissez la nouvelle limite dans le chat ci-dessous'],
  ['User limit must be between 0 and 99.', 'La limite d’utilisateurs doit être comprise entre 0 et 99.'],
  ['Please enter the new bitrate in kbps (8-384).', 'Veuillez saisir le nouveau débit en kbps (8-384).'],
  ['Type the new bitrate in the chat below', 'Saisissez le nouveau débit dans le chat ci-dessous'],
  ['Remove Trigger Channel', 'Supprimer le salon déclencheur'], ['Remove Channel', 'Supprimer le salon'], ['Channel Removed', 'Salon supprimé'],
  ['Trigger Channel', 'Salon déclencheur'], ['Removed Join to Create trigger', 'Salon déclencheur « Rejoindre pour créer » supprimé'],
  ['Join to Create trigger removed by administrator', 'Salon déclencheur « Rejoindre pour créer » supprimé par l’administrateur'],
  ['🗑️ Yes, Delete', '🗑️ Oui, supprimer'], ['❌ An error occurred while processing your request.', '❌ Une erreur est survenue lors du traitement de votre demande.'],

  // Outils / recherche
  ['Google Search', 'Recherche Google'], ['Google Search Results', 'Résultats de recherche Google'], ['Google search link generated', 'Lien de recherche Google généré'],
  ['The term to look up on Urban Dictionary', 'Le terme à rechercher sur Urban Dictionary'], ['Urban command - term too short', 'Commande Urban — terme trop court'],
  ['Please enter a term with at least 2 characters.', 'Veuillez saisir un terme d’au moins 2 caractères.'],
  ['*No example provided*', '*Aucun exemple fourni*'], ['Urban Dictionary error', 'Erreur Urban Dictionary'],
  ['Too many requests to Urban Dictionary. Please try again in a few minutes.', 'Trop de requêtes vers Urban Dictionary. Veuillez réessayer dans quelques minutes.'],
  ['Define command - word too short', 'Commande de définition — mot trop court'], ['Please enter a word with at least 2 characters.', 'Veuillez saisir un mot d’au moins 2 caractères.'],
  ['Dictionary lookup error', 'Erreur lors de la recherche dans le dictionnaire'],
  ['The message the bot should send', 'Le message que le bot doit envoyer'], ['Channel to send in (defaults to the current channel)', 'Salon d’envoi (le salon actuel par défaut)'],
  ['Message cannot be empty.', 'Le message ne peut pas être vide.'], ['Message Sent', 'Message envoyé'],
  ['Locks the current channel (prevents @everyone from sending messages).', 'Verrouille le salon actuel (empêche @everyone d’envoyer des messages).'],
  ['Unlocks the current channel (allows @everyone to send messages again).', 'Déverrouille le salon actuel (permet à nouveau à @everyone d’envoyer des messages).'],
  ['Channel Locked', 'Salon verrouillé'], ['Channel Unlocked', 'Salon déverrouillé'], ['Bot Message Sent', 'Message du bot envoyé'],

  // Tâches / listes / niveaux
  ['Add Task', 'Ajouter une tâche'], ['Complete Task', 'Terminer une tâche'], ['Remove Task', 'Retirer une tâche'],
  ['Add Task to Shared List', 'Ajouter une tâche à la liste partagée'], ['Complete Task in Shared List', 'Terminer une tâche dans la liste partagée'],
  ['Remove Task from Shared List', 'Retirer une tâche de la liste partagée'], ['Task Completed', 'Tâche terminée'], ['Task not found.', 'Tâche introuvable.'],
  ['Shared list not found.', 'Liste partagée introuvable.'], ['Invalid shared list ID.', 'Identifiant de liste partagée invalide.'],
  ["You don't have access to this list.", 'Vous n’avez pas accès à cette liste.'],
  ['Leveling system is disabled on this server', 'Le système de niveaux est désactivé sur ce serveur'],
  ['The leveling system is currently disabled on this server.', 'Le système de niveaux est actuellement désactivé sur ce serveur.'],
  ['{user} has leveled up to level {level}!', '{user} est passé au niveau {level} !'], ['Total XP', 'XP total'],
  ['No users on the leaderboard yet!', 'Aucun utilisateur au classement pour le moment !'],

  // Vérification
  ['Server Verification', 'Vérification du serveur'], ['Verification system is enabled', 'Le système de vérification est activé'],
  ['Verification system disabled', 'Système de vérification désactivé'], ['User auto-verified on join', 'Utilisateur vérifié automatiquement à son arrivée'],
  ['Verified role not found', 'Rôle de vérification introuvable'], ['No roles provided', 'Aucun rôle fourni'],

  // Réponses système
  ['Pinging...', 'Calcul de la latence…'], ['Database not available', 'Base de données indisponible'],
  ['Database service not available', 'Service de base de données indisponible'],
  ['Database service is currently unavailable. Please try again later.', 'Le service de base de données est actuellement indisponible. Veuillez réessayer plus tard.'],
  ['Failed to save server configuration. Please try again.', 'Impossible d’enregistrer la configuration du serveur. Veuillez réessayer.'],
  ['Failed to update server configuration. Please try again.', 'Impossible de mettre à jour la configuration du serveur. Veuillez réessayer.'],
  ['Failed to set up Join to Create system. Please check bot permissions.', 'Impossible de configurer le système « Rejoindre pour créer ». Vérifiez les permissions du bot.'],
  ['Unexpected error in config_setup:', 'Erreur inattendue dans config_setup :'],
  ['Unexpected error in jointocreate command:', 'Erreur inattendue dans la commande jointocreate :'],
  ['An unexpected error occurred while updating the configuration.', 'Une erreur inattendue est survenue lors de la mise à jour de la configuration.'],
  ['You’re doing that too quickly. Wait a moment and try again.', 'Vous effectuez cette action trop rapidement. Attendez un moment puis réessayez.'],
  ["You're doing that too quickly. Wait a moment and try again.", 'Vous effectuez cette action trop rapidement. Attendez un moment puis réessayez.'],
  ['User error', 'Erreur utilisateur'], ['All response attempts failed:', 'Toutes les tentatives de réponse ont échoué :'],
  ['Error responding to interaction:', 'Erreur lors de la réponse à l’interaction :'],
  ['Failed to send error message:', 'Impossible d’envoyer le message d’erreur :'],
  ['Failed to send error reply:', 'Impossible d’envoyer la réponse d’erreur :'],
  ['Error registering commands:', 'Erreur lors de l’enregistrement des commandes :'],
  ['Fatal error during bot startup:', 'Erreur fatale lors du démarrage du bot :'],
  ['Loading handlers...', 'Chargement des gestionnaires…'],

  // Descriptions de commandes fréquentes
  ['View bot statistics', 'Voir les statistiques du bot'],
  ['Check how long the bot has been online', 'Voir depuis combien de temps le bot est en ligne'],
  ["Checks the bot's latency and API speed", 'Vérifier la latence du bot et la vitesse de l’API'],
  ['Get link to the support server', 'Obtenir le lien du serveur d’assistance'],
  ['Manage the server counting game', 'Gérer le jeu de comptage du serveur'],
  ['Start a counting game in a text channel', 'Démarrer un jeu de comptage dans un salon textuel'],
  ['Disable the counting game for this server', 'Désactiver le jeu de comptage pour ce serveur'],
  ['View current counting game status', 'Voir l’état actuel du jeu de comptage'],
  ['Reset the current counting sequence', 'Réinitialiser la suite de comptage actuelle'],
  ['Show the counting game leaderboard', 'Afficher le classement du jeu de comptage'],
  ['Manage the server configuration dashboard and setup wizard', 'Gérer le tableau de bord de configuration et l’assistant de configuration du serveur'],
  ['Displays the help menu with all available commands', 'Afficher le menu d’aide avec toutes les commandes disponibles'],
  ['Manage server logging — channels, filters, and event categories.', 'Gérer la journalisation du serveur : salons, filtres et catégories d’événements.'],
]);

// Fragments courts supplémentaires : ils permettent de traduire les messages
// dynamiques sans toucher aux IDs, mentions, URLs ou valeurs techniques.
const fragments = [
  ['Please ', 'Veuillez '], ['Please.', 'Veuillez.'], ['You have ', 'Vous avez '], ['You need ', 'Vous avez besoin de '],
  ['You cannot ', 'Vous ne pouvez pas '], ['You can ', 'Vous pouvez '], ['Your ', 'Votre '], ['your ', 'votre '],
  ['This ', 'Ce '], ['This command', 'Cette commande'], ['This action', 'Cette action'], ['The ', 'Le '], ['the ', 'le '],
  ['A user', 'Un utilisateur'], ['user', 'utilisateur'], ['User', 'Utilisateur'], ['users', 'utilisateurs'], ['Users', 'Utilisateurs'],
  ['server', 'serveur'], ['Server', 'Serveur'], ['channel', 'salon'], ['Channel', 'Salon'], ['role', 'rôle'], ['Role', 'Rôle'],
  ['reason', 'raison'], ['Reason', 'Raison'], ['message', 'message'], ['Message', 'Message'], ['command', 'commande'], ['Command', 'Commande'],
  ['error', 'erreur'], ['Error', 'Erreur'], ['warning', 'avertissement'], ['Warning', 'Avertissement'], ['success', 'succès'], ['Success', 'Succès'],
  ['not found', 'introuvable'], ['Not found', 'Introuvable'], ['already', 'déjà'], ['currently', 'actuellement'],
  ['enabled', 'activé'], ['Enabled', 'Activé'], ['disabled', 'désactivé'], ['Disabled', 'Désactivé'],
  ['failed', 'échoué'], ['Failed', 'Échec'], ['successfully', 'avec succès'], ['successfully.', 'avec succès.'],
  ['created', 'créé'], ['Created', 'Créé'], ['updated', 'mis à jour'], ['Updated', 'Mis à jour'],
  ['deleted', 'supprimé'], ['Deleted', 'Supprimé'], ['removed', 'retiré'], ['Removed', 'Retiré'],
  ['add', 'ajouter'], ['Add', 'Ajouter'], ['remove', 'retirer'], ['Remove', 'Retirer'], ['create', 'créer'], ['Create', 'Créer'],
  ['delete', 'supprimer'], ['Delete', 'Supprimer'], ['update', 'mettre à jour'], ['Update', 'Mettre à jour'],
  ['select', 'sélectionner'], ['Select', 'Sélectionnez'], ['choose', 'choisir'], ['Choose', 'Choisissez'],
  ['enter', 'saisir'], ['Enter', 'Saisissez'], ['send', 'envoyer'], ['Send', 'Envoyer'], ['view', 'voir'], ['View', 'Voir'],
  ['total', 'total'], ['Total', 'Total'], ['next', 'suivant'], ['Next', 'Suivant'], ['previous', 'précédent'], ['Previous', 'Précédent'],
  ['duration', 'durée'], ['Duration', 'Durée'], ['amount', 'montant'], ['Amount', 'Montant'], ['price', 'prix'], ['Price', 'Prix'],
  ['level', 'niveau'], ['Level', 'Niveau'], ['rank', 'classement'], ['Rank', 'Classement'], ['leaderboard', 'classement'], ['Leaderboard', 'Classement'],
  ['queue', 'file d’attente'], ['Queue', 'File d’attente'], ['music', 'musique'], ['Music', 'Musique'],
  ['ticket', 'ticket'], ['Ticket', 'Ticket'], ['tickets', 'tickets'], ['Tickets', 'Tickets'],
  ['economy', 'économie'], ['Economy', 'Économie'], ['moderation', 'modération'], ['Moderation', 'Modération'],
  ['giveaway', 'concours'], ['Giveaway', 'Concours'], ['birthday', 'anniversaire'], ['Birthday', 'Anniversaire'],
  ['welcome', 'bienvenue'], ['Welcome', 'Bienvenue'], ['verification', 'vérification'], ['Verification', 'Vérification'],
  ['search', 'recherche'], ['Search', 'Recherche'], ['support', 'assistance'], ['Support', 'Assistance'],
];

/** Traduit uniquement du texte affiché, jamais les identifiants techniques. */
export function localizeText(value) {
  if (typeof value !== 'string' || !value) return value;

  let translated = translations.get(value) ?? value;

  // Les remplacements longs sont appliqués avant les fragments courts.
  if (translated === value) {
    for (const [english, french] of fragments) {
      translated = translated.replaceAll(english, french);
    }
  }

  return translated;
}

function patchTextMethod(Class, method) {
  const original = Class?.prototype?.[method];
  if (!original || original.__frenchLocalized) return;

  const localized = function (value, ...rest) {
    return original.call(this, localizeText(value), ...rest);
  };
  localized.__frenchLocalized = true;
  Class.prototype[method] = localized;
}

function patchFooter() {
  const original = EmbedBuilder.prototype.setFooter;
  if (!original || original.__frenchLocalized) return;

  const localized = function (footer) {
    if (!footer || typeof footer !== 'object' || typeof footer.text !== 'string') {
      return original.call(this, footer);
    }
    return original.call(this, { ...footer, text: localizeText(footer.text) });
  };
  localized.__frenchLocalized = true;
  EmbedBuilder.prototype.setFooter = localized;
}

function patchSelectMenuOptions() {
  const original = StringSelectMenuBuilder.prototype.addOptions;
  if (!original || original.__frenchLocalized) return;

  const localizeOption = (option) => {
    if (!option || typeof option !== 'object') return option;

    // Discord.js accepte les builders et les objets JSON. Si un builder est
    // fourni, on utilise toJSON() au lieu de spread() afin de ne pas perdre
    // ses propriétés internes / provoquer une validation Shapeshift invalide.
    const data = typeof option.toJSON === 'function' ? option.toJSON() : { ...option };

    return {
      ...data,
      ...(typeof data.label === 'string' ? { label: localizeText(data.label) } : {}),
      ...(typeof data.description === 'string' ? { description: localizeText(data.description) } : {}),
    };
  };

  const localized = function (...options) {
    // addOptions() reçoit parfois un tableau unique et parfois plusieurs
    // options. On aplatit uniquement le conteneur, jamais les données internes.
    const flattened = options.flatMap(option => Array.isArray(option) ? option : [option]);
    return original.call(this, ...flattened.map(localizeOption));
  };
  localized.__frenchLocalized = true;
  StringSelectMenuBuilder.prototype.addOptions = localized;
}

function patchEmbedFields() {
  const original = EmbedBuilder.prototype.addFields;
  if (!original || original.__frenchLocalized) return;

  const localizeField = (field) => {
    if (!field || typeof field !== 'object') return field;
    // Ne pas transformer un builder en objet partiellement compatible.
    if (typeof field.toJSON === 'function') {
      const data = field.toJSON();
      return {
        ...data,
        ...(typeof data.name === 'string' ? { name: localizeText(data.name) } : {}),
        ...(typeof data.value === 'string' ? { value: localizeText(data.value) } : {}),
      };
    }
    return {
      ...field,
      ...(typeof field.name === 'string' ? { name: localizeText(field.name) } : {}),
      ...(typeof field.value === 'string' ? { value: localizeText(field.value) } : {}),
    };
  };

  const localized = function (...fields) {
    return original.call(this, ...fields.map(field =>
      Array.isArray(field) ? field.map(localizeField) : localizeField(field)
    ));
  };
  localized.__frenchLocalized = true;
  EmbedBuilder.prototype.addFields = localized;
}

/**
 * Active la localisation sans toucher à addOptions().
 * Les options construites avec StringSelectMenuOptionBuilder sont localisées
 * via leurs setters, ce qui conserve toute leur structure interne Discord.js.
 */
export function enableFrenchLocalization() {
  [EmbedBuilder, ModalBuilder].forEach(Class => patchTextMethod(Class, 'setTitle'));
  patchTextMethod(EmbedBuilder, 'setDescription');
  [ButtonBuilder, StringSelectMenuOptionBuilder].forEach(Class => patchTextMethod(Class, 'setLabel'));
  [TextInputBuilder, StringSelectMenuBuilder].forEach(Class => patchTextMethod(Class, 'setPlaceholder'));

  [
    SlashCommandBuilder,
    SlashCommandSubcommandBuilder,
    SlashCommandSubcommandGroupBuilder,
    SlashCommandStringOption,
    SlashCommandIntegerOption,
    SlashCommandNumberOption,
    SlashCommandBooleanOption,
    SlashCommandUserOption,
    SlashCommandChannelOption,
    SlashCommandRoleOption,
    SlashCommandMentionableOption,
    SlashCommandAttachmentOption,
  ].forEach(Class => patchTextMethod(Class, 'setDescription'));

  patchFooter();
  patchSelectMenuOptions();
  patchEmbedFields();
}
