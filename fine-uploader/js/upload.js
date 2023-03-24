var uploader = new qq.s3.FineUploader({
    debug: false,
    multiple: true,
    element: document.getElementById('fine-uploader'),
    request: {
        endpoint: 'https://xxx.s3.amazonaws.com',
        accessKey: '[accessKey]'
    },
    deleteFile: {
        enabled: true,
        forceConfirm: true,
        endpoint: 'https://xxx.s3.amazonaws.com/uploads',
    },
    objectProperties: {
        region: 'ap-northeast-2',
        key(fileId) {
            var filename = this.getName(fileId)
            return 'uploads/' + filename
        }
    },
    signature: {
        version: 4,
        endpoint: 'https://xxx.execute-api.ap-northeast-2.amazonaws.com/dev'
    },
    retry: {
        enableAuto: true
    },
    callbacks: {
        onComplete: function(id, name, object, xhr) {
            console.log(id, name, object, xhr);
        }
    }
});