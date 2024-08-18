let rconParser;
let eventParser;

const plugin = {
    author: 'RaidMax',
    version: 0.1,
    name: 'L4D2 (SourceMod) Parser',
    engine: 'Source',
    isParser: true,

    onEventAsync: function (gameEvent, server) {
    },

    onLoadAsync: function (manager) {
        rconParser              = manager.GenerateDynamicRConParser(this.name);
        eventParser             = manager.GenerateDynamicEventParser(this.name);
        rconParser.RConEngine   = this.engine;

        rconParser.Configuration.StatusHeader.Pattern = '# userid name uniqueid connected ping loss state rate adr';

        rconParser.Configuration.MapStatus.Pattern = '^map *: +(.+)$';
        rconParser.Configuration.MapStatus.AddMapping(111, 1);

        rconParser.Configuration.HostnameStatus.Pattern = '^hostname: +(.+)$';
        rconParser.Configuration.HostnameStatus.AddMapping(113, 1);

        rconParser.Configuration.MaxPlayersStatus.Pattern = '^players *: +\\d+ humans, \\d+ bots \\((\\d+).+';
        rconParser.Configuration.MaxPlayersStatus.AddMapping(114, 1);

        rconParser.Configuration.Dvar.Pattern = '^\\"(.+)\\" (?:=|is) \\"(.+)\\"(?: (?:\\( def. \\"(.*)\\" \\)))?$';
        rconParser.Configuration.Dvar.AddMapping(106, 1);
        rconParser.Configuration.Dvar.AddMapping(107, 2);
        rconParser.Configuration.Dvar.AddMapping(108, 3);
        rconParser.Configuration.Dvar.AddMapping(109, 3);

        rconParser.Configuration.Status.Pattern = '^#\\s*(\\d+) (\\d+) "(.+)" (\\S+) +(\\d+:\\d+(?::\\d+)?) (\\d+) (\\S+) (\\S+) (\\d+) (\\d+\\.\\d+\\.\\d+\\.\\d+:\\d+)$';
        rconParser.Configuration.Status.AddMapping(100, 2);
        rconParser.Configuration.Status.AddMapping(101, -1);
        rconParser.Configuration.Status.AddMapping(102, 6);
        rconParser.Configuration.Status.AddMapping(103, 4)
        rconParser.Configuration.Status.AddMapping(104, 3);
        rconParser.Configuration.Status.AddMapping(105, 10);
        rconParser.Configuration.Status.AddMapping(200, 1);

        rconParser.Configuration.DefaultDvarValues.Add('sv_running', '1');
        rconParser.Configuration.DefaultDvarValues.Add('bugfix_no_version', this.engine);
        rconParser.Configuration.DefaultDvarValues.Add('fs_basepath', '');
        rconParser.Configuration.DefaultDvarValues.Add('fs_basegame', '');
        rconParser.Configuration.DefaultDvarValues.Add('fs_homepath', '');
        rconParser.Configuration.DefaultDvarValues.Add('g_log', '');
        rconParser.Configuration.DefaultDvarValues.Add('net_ip', 'localhost');
        rconParser.Configuration.DefaultDvarValues.Add('g_gametype', '');
        rconParser.Configuration.DefaultDvarValues.Add('fs_game', '');

        rconParser.Configuration.OverrideDvarNameMapping.Add('sv_hostname', 'hostname');
        rconParser.Configuration.OverrideDvarNameMapping.Add('mapname', 'host_map');
        rconParser.Configuration.OverrideDvarNameMapping.Add('sv_maxclients', 'maxplayers');
        rconParser.Configuration.OverrideDvarNameMapping.Add('g_password', 'sv_password');
        rconParser.Configuration.OverrideDvarNameMapping.Add('version', 'bugfix_no_version');

        rconParser.Configuration.ColorCodeMapping.Clear();
        rconParser.Configuration.ColorCodeMapping.Add('White', '\x01');
        rconParser.Configuration.ColorCodeMapping.Add('Red', '\x07');
        rconParser.Configuration.ColorCodeMapping.Add('LightRed', '\x0F');
        rconParser.Configuration.ColorCodeMapping.Add('DarkRed', '\x02');
        rconParser.Configuration.ColorCodeMapping.Add('Blue', '\x0B');
        rconParser.Configuration.ColorCodeMapping.Add('DarkBlue', '\x0C');
        rconParser.Configuration.ColorCodeMapping.Add('Purple', '\x03');
        rconParser.Configuration.ColorCodeMapping.Add('Orchid', '\x0E');
        rconParser.Configuration.ColorCodeMapping.Add('Yellow', '\x09');
        rconParser.Configuration.ColorCodeMapping.Add('Gold', '\x10');
        rconParser.Configuration.ColorCodeMapping.Add('LightGreen', '\x05');
        rconParser.Configuration.ColorCodeMapping.Add('Green', '\x04');
        rconParser.Configuration.ColorCodeMapping.Add('Lime', '\x06');
        rconParser.Configuration.ColorCodeMapping.Add('Grey', '\x08');
        rconParser.Configuration.ColorCodeMapping.Add('Grey2', '\x0D');
        // only adding there here for the default accent color
        rconParser.Configuration.ColorCodeMapping.Add('Cyan', '\x0B');

        rconParser.Configuration.NoticeLineSeparator    = '. ';
        rconParser.Configuration.DefaultRConPort        = 27015;
        rconParser.CanGenerateLogPath                   = false;

        rconParser.Configuration.CommandPrefixes.RConGetInfo    = undefined;
        rconParser.Configuration.CommandPrefixes.Kick           = 'sm_kick #{0} {1}';
        rconParser.Configuration.CommandPrefixes.Ban            = 'sm_kick #{0} {1}';
        rconParser.Configuration.CommandPrefixes.TempBan        = 'sm_kick #{0} {1}';
        rconParser.Configuration.CommandPrefixes.Say            = 'sm_say {0}';
        rconParser.Configuration.CommandPrefixes.Tell           = 'sm_psay #{0} "{1}"';

        eventParser.Configuration.Say.Pattern = '^"(.+)<(\\d+)><(.+)><(.*?)>" (?:say|say_team) "(.*)"$';
        eventParser.Configuration.Say.AddMapping(5, 1);
        eventParser.Configuration.Say.AddMapping(3, 2);
        eventParser.Configuration.Say.AddMapping(1, 3);
        eventParser.Configuration.Say.AddMapping(7, 4);
        eventParser.Configuration.Say.AddMapping(13, 5);

        eventParser.Configuration.Kill.Pattern = '^"(.+)<(\\d+)><(.+)><(.*)>" \\[-?\\d+ -?\\d+ -?\\d+\\] killed "(.+)<(\\d+)><(.+)><(.*)>" \\[-?\\d+ -?\\d+ -?\\d+\\] with "(\\S*)" *(?:\\((\\w+)((?: ).+)?\\))?$';
        eventParser.Configuration.Kill.AddMapping(5, 1);
        eventParser.Configuration.Kill.AddMapping(3, 2);
        eventParser.Configuration.Kill.AddMapping(1, 3);
        eventParser.Configuration.Kill.AddMapping(7, 4);
        eventParser.Configuration.Kill.AddMapping(6, 5);
        eventParser.Configuration.Kill.AddMapping(4, 6);
        eventParser.Configuration.Kill.AddMapping(2, 7);
        eventParser.Configuration.Kill.AddMapping(8, 8);
        eventParser.Configuration.Kill.AddMapping(9, 9);
        eventParser.Configuration.Kill.AddMapping(12, 10);

        eventParser.Configuration.MapEnd.Pattern = '^World triggered "Match_Start" on "(.+)"$';

        eventParser.Configuration.JoinTeam.Pattern = '^"(.+)<(\\d+)><(.*)>" switched from team <(.+)> to <(.+)>$';
        eventParser.Configuration.JoinTeam.AddMapping(5, 1);
        eventParser.Configuration.JoinTeam.AddMapping(3, 2);
        eventParser.Configuration.JoinTeam.AddMapping(1, 3);
        eventParser.Configuration.JoinTeam.AddMapping(7, 5);

        eventParser.Configuration.TeamMapping.Add('CT', 2);
        eventParser.Configuration.TeamMapping.Add('TERRORIST', 3);

        eventParser.Configuration.Time.Pattern = '^L [01]\\d/[0-3]\\d/\\d+ - [0-2]\\d:[0-5]\\d:[0-5]\\d:';

        rconParser.Version      = 'L4D2SM';
        rconParser.GameName     = 12; // L4D2
        eventParser.Version     = 'L4D2SM';
        eventParser.GameName    = 12; // L4D2
        eventParser.URLProtocolFormat = 'steam://connect/{{ip}}:{{port}}';
    },

    onUnloadAsync: function () {
    },

    onTickAsync: function (server) {
    }
};
