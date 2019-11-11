<?php
/**
 * The base configurations of the WordPress.
 *
 * This file has the following configurations: MySQL settings, Table Prefix,
 * Secret Keys, WordPress Language, and ABSPATH. You can find more information
 * by visiting {@link http://codex.wordpress.org/Editing_wp-config.php Editing
 * wp-config.php} Codex page. You can get the MySQL settings from your web host.
 *
 * This file is used by the wp-config.php creation script during the
 * installation. You don't have to use the web site, you can just copy this file
 * to "wp-config.php" and fill in the values.
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('WP_CACHE', true);
define( 'WPCACHEHOME', '/home/wh_wmd_2016/whatsmydestiny.com/wp-content/plugins/wp-super-cache/' );
define('DB_NAME', 'whatsmydestiny_com_3');

/** MySQL database username */
define('DB_USER', '9amsbe9');

/** MySQL database password */
define('DB_PASSWORD', 'xCeCjzKS');

/** MySQL hostname */
define('DB_HOST', 'mysql.whatsmydestiny.com');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         'Y?p|hT/dD`#?t34!c8J*B)5R5kv&xJ"ZTp$&IebyM5Gz@!&u/K#__jM/);rhIe$S');
define('SECURE_AUTH_KEY',  '0ja`%bhPfIm0OOGN"cMr5!@o2NL?qlhPw?%h/Yi1MTDxDV(i:l/_Fb&/j;V+&+:H');
define('LOGGED_IN_KEY',    'Q/5WTw/@_|OweqQm5&_Umf)PK_VeCdt!ga"aoCSkldwh(@#z$DskTEG2h`VPedI2');
define('NONCE_KEY',        '#AHLV77(8T(chgJ^;uz#v)h/@1)m5h51f1mb)?s/K_;IDGzR(DxV0O|4ad9idQvX');
define('AUTH_SALT',        'g)%xxnB`:"B($;_HS3u)gcb$b1c%4FDe%Z~@FnKF*|kL%Nin03eAj+Ag:$~_|VZ1');
define('SECURE_AUTH_SALT', 'S14#C#$zeiXV32XUUibnzd|3DXHbr!tVwso8S3wss:~qy%$v`aQwFjfgSwiydJzX');
define('LOGGED_IN_SALT',   '9N$?%O+_aO$#FKr8MrVj7JRC;?i*qrf;D?4c)#IJ_5"9y_7Savi1("C*PgCFfHj7');
define('NONCE_SALT',       'W~;X"aK:1Cq)sAAu"R)E7*WN7rC6Pg?YAf"/(qEVS6gP/dbG/zGHZ(%v0mB$Rl+n');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each a unique
 * prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wp_qkexnz_';

/**
 * Limits total Post Revisions saved per Post/Page.
 * Change or comment this line out if you would like to increase or remove the limit.
 */
define('WP_POST_REVISIONS',  10);

/**
 * WordPress Localized Language, defaults to English.
 *
 * Change this to localize WordPress. A corresponding MO file for the chosen
 * language must be installed to wp-content/languages. For example, install
 * de_DE.mo to wp-content/languages and set WPLANG to 'de_DE' to enable German
 * language support.
 */
define('WPLANG', '');

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 */
define('WP_DEBUG', false);

/* SSL certificate config */
define('FORCE_SSL', true);
define('FORCE_SSL_ADMIN',true);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');

