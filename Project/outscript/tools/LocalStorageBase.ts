namespace Tools {
    export class LocalStorageBase {
        private key: string;
        public Key(): string {
            return this.key;
        }

        public constructor(key: string) {
            this.key = key;
        }

        public Save() {
            LocalStorageUtils.setObject(this.key, this);
        }
    }
}

var LocalStorageBase = Tools.LocalStorageBase