import { TreeNode, TreeModel } from 'angular-tree-component';
const LINK = './assets/110857-phone-icons/svg/';

export class Default {
    id: Number;
    name: String;
    valid: Boolean;
    type: String;
    index: number;
    source: String;
    settings;
    required;
    optional;
    advanced;
    children = [];
    public constructor(name?, index?) {
        this.name = name ? name : null;
        if (index) {
            this.index = index;
        }
        this.type = 'Default';
        this.source = LINK + 'horizontal-smartphone-chatting' + '.svg';
        this.valid = false;
        this.children = [];
    }
}
export class Home {
    name: String;
    valid: Boolean;
    type: String;
    source: String;
    settings;
    children;
    shortcut: Boolean = false;
    public constructor() {
        this.name = 'Home';
        this.type = 'Home';
        this.source = LINK + 'worldwide-transmissions' + '.svg';
        this.settings = {
            chooseparameter: 'General',
            general: {
                dialogstartslanguage: '',
                precallmode: false,
                mediafileinterruptible: true,
                enddigit: '#'
            },
            record: {
                emailaddress: '',
                stopondtmfinput: true,
                automaticgainenabled: true,
                silenceelimination: 5,
                threshold: 5
            },
            menu: {
                timeoutforchoice: 5,
                maximumnumberoftimeouts: 3,
                maximumnumberofwrongchoices: 3,
                mediafiletimeoutinput: '',
                mediafilewronginput: ''
            },
            userinput: {
                minimumlength: 4,
                maximumlength: 8,
                timeoutforinput: 5,
                maximumnumberoftimeouts: 3,
                maximumnumberofwronginputs: 3,
                mediafiletimeoutinput: '',
                mediafilewronginput: ''
            },
            transfer: {
                transfertype: 'bridged',
                outboundpool: 'default',
                transferednumber: '',
                callingnumber: '',
                maximumringtime: 30,
                tlinumberplan: 'A-leg',
                tlinumberformat: 'A-leg',
                tlinumberscreening: 'A-leg',
                clinumberplan: 'A-leg',
                clinumberformat: 'A-leg',
                clinumberscreening: 'A-leg',
                clinumberpresentation: 'A-leg'
            },
            sfcc: {
                campaign: 'helpdesk'
            },
            reroute: {
                goto: ''
            },
            variables: [{
                index: 1,
                variablename: '',
                value: ''
            }]
        };
        this.valid = true;
        this.children = [new Default()];
    }
}

export class Play {
    name: String;
    valid: Boolean;
    type: String;
    source: String;
    required;
    optional;
    advanced;
    children = [];
    shortcut: Boolean = false;
    public constructor() {
        this.name = 'Play';
        this.type = 'Play';
        this.source = LINK + 'smartphone-ringing' + '.svg';
        this.required = {
            mediafile: '',
        };
        this.optional = {
            mediafileinterruptible: true,
            callmarker: ''
        };
        this.advanced = {
            mediafilecached: true
        };
        this.valid = false;
        this.children = [];
    }
}

export class VariablePlay {
    name: String;
    valid: Boolean;
    type: String;
    source: String;
    required;
    optional;
    advanced;
    children = [];
    shortcut: Boolean = false;
    public constructor() {
        this.name = 'VariablePlay';
        this.type = 'VariablePlay';
        this.source = LINK + 'smartphone-message' + '.svg';
        this.required = {
            variabletoplay: 'Please select',
            typeofvariable: 'Please select',
            useendintonation: false
        };
        this.optional = {
            playinterruptible: true,
            callmarker: '',
            alternativepromptlocation: ''
        };
        this.advanced = {
        };
        this.valid = false;
        this.children = [];
    }
}

export class DynamicPlay {
    name: String;
    valid: Boolean;
    type: String;
    source: String;
    required;
    optional;
    advanced;
    children = [];
    shortcut: Boolean = false;
    public constructor() {
        this.name = 'DynamicPlay';
        this.type = 'DynamicPlay';
        this.source = LINK + 'smartphone-24-hours-service' + '.svg';
        this.required = {
            dynamicmedia: ''
        };
        this.optional = {
            mediainterruptible: true,
            callmarker: ''
        };
        this.valid = false;
        this.children = [];
    }
}

export class UrlPlay {
    name: String;
    valid: Boolean;
    type: String;
    source: String;
    required = {};
    optional = {};
    advanced = {};
    children = [];
    shortcut: Boolean = false;
    public constructor() {
        this.name = 'UrlPlay';
        this.type = 'UrlPlay';
        this.source = LINK + 'smartphone-screen-with-sound-line' + '.svg';
        this.required = {
            urltoplay: 'Please select'
        };
        this.optional = {
            mediafileinterruptible: false,
            callmarker: ''
        };
        this.advanced = {
            mediafilecached: null
        };
        this.valid = false;
        this.children = [];
    }
}

export class Transfer {
    name: String;
    valid: Boolean;
    type: String;
    source: String;
    required = {};
    optional = {};
    advanced = {};
    children = [];
    shortcut: Boolean = false;
    public constructor() {
        this.name = 'Transfer';
        this.type = 'Transfer';
        this.source = LINK + 'person-of-a-call-center-in-communication-with-headphones' + '.svg';
        this.required = {
            numbertotransfer: 'Please select'
        };
        this.optional = {
            callmarker: '',
            outboundpool: 'default',
            callingnumber: '',
            maximumringtime: 30,
            transfertype: 'bridged'
        };
        this.advanced = {
            tlinumberplan: 'A-leg',
            tlinumberformat: 'A-leg',
            tlinumberscreening: 'A-leg',
            clinumberplan: 'A-leg',
            clinumberformat: 'A-leg',
            clinumberscreening: 'A-leg',
            clinumberpresentation: 'A-leg'
        };
        this.valid = false;
        this.children = [];
    }
}

export class Menu {
    name: String;
    valid: Boolean;
    type: String;
    source: String;
    required;
    optional;
    advanced;
    children = [];
    shortcut: Boolean = false;
    public constructor() {
        this.name = 'Menu';
        this.type = 'Menu';
        this.source = LINK + 'office-telephone' + '.svg';
        this.valid = false;
        this.required = {
            mediafile: '',
        };
        this.optional = {
            callmarker: '',
            mediafileinterruptible: true,
            timeoutforchoice: 5,
            maximumtimeouts: 3,
            maximumwrongchoices: 3,
            mediafiletimeoutchoice: '',
            mediafilewrongchoice: '',
        };
        this.advanced = {
            mediafilecached: true
        };
        this.children = [];
    }
}

export class Record {
    name: String;
    valid: Boolean;
    type: String;
    source: String;
    required;
    optional;
    advanced;
    children = [];
    shortcut: Boolean = false;
    public constructor() {
        this.name = 'Record';
        this.type = 'Record';
        this.source = LINK + 'smartphone-receiving-sign' + '.svg';
        this.required = {
            recordingaction: 'storeinvariable',
            variablename: 'Please select',
            stopondtmfinput: true
        };
        this.optional = {
            callmarker: '',
            beepbeforerecord: true,
            mediafile: '',
            mediafileinterruptible: true
        };
        this.advanced = {
            silenceelimination: 5,
            threshold: 5,
            automaticgainenabled: true,
            mediafilecached: true
        };
        this.valid = false;
        this.children = [];
    }
}

export class WebService {
    name: String;
    valid: Boolean;
    type: String;
    source: String;
    required = {};
    optional = {};
    advanced = {};
    children = [];
    shortcut: Boolean = false;
    public constructor() {
        this.name = 'WebService';
        this.type = 'WebService';
        this.source = LINK + 'worlwide-transmission' + '.svg';
        this.required = {
            url: ''
        };
        this.optional = {
            callmarker: '',
            repromptafter: '',
            repromptmediafile: '',
            timeout: ''
        };
        this.advanced = {
            mediafilecached: null,
            method: 'HTTP get'
        };
        this.valid = false;
        this.children = [];
    }
}

export class If {
    name: String;
    valid: Boolean;
    type: String;
    source: String;
    required = [];
    optional = {};
    advanced = {};
    children = [];
    shortcut: Boolean = false;
    public constructor() {
        this.name = 'If';
        this.type = 'If';
        this.source = LINK + 'smartphone-with-reload-arrows' + '.svg';
        this.valid = false;
        this.children = [];
    }
}

export class Load {
    name: String;
    valid: Boolean;
    type: String;
    source: String;
    required = [];
    optional = {};
    advanced = {};
    children = [];
    shortcut: Boolean = false;
    public constructor() {
        this.name = 'Load';
        this.type = 'Load';
        this.source = LINK + 'refresh-wifi-signal' + '.svg';
        this.valid = false;
        this.children = [];
    }
}

export class Time {
    name: String;
    valid: Boolean;
    type: String;
    source: String;
    required = [];
    optional = {};
    advanced = {};
    children = [];
    shortcut: Boolean = false;
    public constructor() {
        this.name = 'Time';
        this.type = 'Time';
        this.source = LINK + 'telephone-line-24-hours-service' + '.svg';
        this.valid = false;
        this.children = [];
    }
}

export class Date {
    name: String;
    valid: Boolean;
    type: String;
    source: String;
    required = [];
    optional = {};
    advanced = {};
    children = [];
    shortcut: Boolean = false;
    public constructor() {
        this.name = 'Date';
        this.type = 'Date';
        this.source = LINK + 'smartphone-24-hours-service' + '.svg';
        this.valid = false;
        this.children = [];
    }
}

export class DayOfWeek {
    name: String;
    valid: Boolean;
    type: String;
    source: String;
    required = [];
    optional = {};
    advanced = {};
    children = [];
    shortcut: Boolean = false;
    public constructor() {
        this.name = 'DayOfWeek';
        this.type = 'DayOfWeek';
        this.source = LINK + 'smartphone-with-email' + '.svg';
        this.valid = false;
        this.children = [];
    }
}


export class UserInput {
    name: String;
    valid: Boolean;
    type: String;
    source: String;
    required;
    optional;
    advanced;
    children = [];
    shortcut: Boolean = false;
    public constructor() {
        this.name = 'UserInput';
        this.type = 'UserInput';
        this.source = LINK + 'finger-touching-tablet-screen' + '.svg';
        this.required = {
            variablename: ''
        };
        this.optional = {
            callmarker: '',
            minimumlength: 4,
            maximumlength: 8,
            timeoutofinput: 5,
            maximumnumbertimeouts: 3,
            maximumnumberwronginputs: 3,
            mediafileinterruptible: true,
            userinputmediafile: '',
            mediafiletimeoutinput: '',
            mediafilewronginput: ''
        };
        this.advanced = {
            mediafilecached: true
        };
        this.valid = false;
        this.children = [];
    }
}

export class Assignment {
    name: String;
    valid: Boolean;
    type: String;
    source: String;
    required = [];
    optional = {};
    advanced = {};
    children = [];
    shortcut: Boolean = false;
    public constructor() {
        this.name = 'Assignment';
        this.type = 'Assignment';
        this.source = LINK + 'smartphone-with-hand' + '.svg';
        this.valid = false;
        this.children = [];
    }
}

export class ConnectPrecall {
    name: String;
    valid: Boolean;
    type: String;
    source: String;
    required = {};
    optional = {};
    advanced = {};
    children = [];
    shortcut: Boolean = false;
    public constructor() {
        this.name = 'ConnectPrecall';
        this.type = 'ConnectPrecall';
        this.source = LINK + 'telephone-receiver-with-circular-arrows' + '.svg';
        this.valid = true;
        this.children = [new Default()];
    }
}

export class SFCC {
    name: String;
    valid: Boolean;
    type: String;
    source: String;
    required = {};
    optional = {};
    advanced = {};
    children = [];
    shortcut: Boolean = false;
    public constructor() {
        this.name = 'SFCC';
        this.type = 'SFCC';
        this.source = LINK + 'smartphone-with-picture' + '.svg';
        this.required = {
            campaign: 'helpdesk'
        };
        this.valid = true;
        this.children = [];
    }
}

export class CCXMLExit {
    name: String;
    valid: Boolean;
    type: String;
    source: String;
    required = {};
    optional = {};
    advanced = {};
    children = [];
    shortcut: Boolean = false;
    public constructor() {
        this.name = 'CCXMLExit';
        this.type = 'CCXMLExit';
        this.source = LINK + 'buying-on-smartphone' + '.svg';
        this.valid = false;
        this.children = [];
    }
}

export class Reroute {
    name: String;
    valid: Boolean;
    type: String;
    source: String;
    required = {};
    optional = {};
    advanced = {};
    children = [];
    shortcut: Boolean = false;
    public constructor() {
        this.name = 'Reroute';
        this.type = 'Reroute';
        this.source = LINK + 'refresh-wifi-signal' + '.svg';
        this.valid = false;
        this.children = [];
    }
}

export class End {
    name: String;
    valid: Boolean;
    type: String;
    source: String;
    required = {};
    optional = {};
    advanced = {};
    children = [];
    shortcut: Boolean = false;
    public constructor() {
        this.name = 'End';
        this.type = 'End';
        this.source = LINK + 'telephone-locked' + '.svg';

        this.optional = {
            callmarker: '',
            mediafile: '',
            mediafileinterruptible: true,
            clearingcause: 'Please select'
        };

        this.valid = true;
        this.children = [];
    }
}

