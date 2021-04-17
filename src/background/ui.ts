import { runCommand } from './commands';
import { supportsUnicodeMenus } from 'common/features';

export function createUIMenus(): void {
    chrome.contextMenus.onClicked.addListener(async (e, tab) => {
        if (!e.editable) {
            return;
        }
        const command = e.menuItemId;
        const url = e.frameId ? e.frameUrl : e.pageUrl;
        const frameId = e.frameId ?? 0;
        await runCommand({ command, tab, url, frameId });
    });

    const submitSuffix = supportsUnicodeMenus ? ' ⏎' : '';

    chrome.contextMenus.create(
        {
            id: 'keeweb-options',
            title: 'KeeWeb',
            contexts: ['editable']
        },
        () => {
            chrome.contextMenus.create({
                id: 'submit-username-password',
                parentId: 'keeweb-options',
                title: `${chrome.i18n.getMessage('cmdSubmitUsernamePassword')}${submitSuffix}`,
                contexts: ['editable']
            });
            chrome.contextMenus.create({
                id: 'insert-username-password',
                parentId: 'keeweb-options',
                title: chrome.i18n.getMessage('cmdInsertUsernamePassword'),
                contexts: ['editable']
            });
            chrome.contextMenus.create({
                id: 'submit-username',
                parentId: 'keeweb-options',
                title: `${chrome.i18n.getMessage('cmdSubmitUsername')}${submitSuffix}`,
                contexts: ['editable']
            });
            chrome.contextMenus.create({
                id: 'insert-username',
                parentId: 'keeweb-options',
                title: chrome.i18n.getMessage('cmdInsertUsername'),
                contexts: ['editable']
            });
            chrome.contextMenus.create({
                id: 'submit-password',
                parentId: 'keeweb-options',
                title: `${chrome.i18n.getMessage('cmdSubmitPassword')}${submitSuffix}`,
                contexts: ['editable']
            });
            chrome.contextMenus.create({
                id: 'insert-password',
                parentId: 'keeweb-options',
                title: chrome.i18n.getMessage('cmdInsertPassword'),
                contexts: ['editable']
            });

            // chrome.contextMenus.create({
            //     id: 'sep-bottom',
            //     type: 'separator',
            //     parentId: 'keeweb-options',
            //     contexts: ['editable']
            // });
            //
            // chrome.contextMenus.create({
            //     id: 'other',
            //     parentId: 'keeweb-options',
            //     title: chrome.i18n.getMessage('menuOtherOptions') + '…',
            //     contexts: ['editable']
            // });
        }
    );
}

export function bindExtensionButtonClick(): void {
    chrome.browserAction.onClicked.addListener(async (tab) => {
        await runCommand({ command: 'submit-auto', tab });
    });
}
