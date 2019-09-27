export interface TestConfigInterface {
    class: string
    critical?: boolean
}

export interface TestResultsInterface {
    success: boolean
    message: string
    context?: {
        [index: string]: any
    }
}

export interface TestInterface {
    id: string
    critical?: boolean
    context: any
    run(context: any): Promise<TestResultsInterface>
    validate(data: any): Promise<boolean>
}

export class Test implements TestInterface {
    id = 'BasicTest';
    critical = false;
    context: any= {};
    constructor(config: TestConfigInterface) {
        this.id = config.class || 'New Test';
        this.critical = config.critical || false;
    }
    run(context: any): Promise<TestResultsInterface> {
        this.context = context;
        return new Promise((resolve, reject) => {
            setTimeout(()=>{
                return resolve({
                    success: true,
                    message: 'Success Test'
                });
            },500)
        });
    }
    validate(date: any): Promise<boolean> {
        return Promise.resolve(true);
    }
    getFromContext(keys: string[]): {[index: string]: any} {
        return keys.map((key: string)=>{
            if ( this.context[key] ) {
                return {
                    [key]: this.context[key]
                }
            }
        }).reduce((a,b)=>({...a,...b}));
    }
}
