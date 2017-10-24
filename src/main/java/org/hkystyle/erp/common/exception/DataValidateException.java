/**
 * Copyright © 2017 hkystyle. All rights reserved.
 */
package org.hkystyle.erp.common.exception;

/**
 * Created by hukaiyang on 2017/10/24.
 */
public class DataValidateException extends BaseException {
    public DataValidateException() {
    }

    public DataValidateException(String msg) {
        super(msg);
    }

    public DataValidateException(String msg, Throwable ex) {
        super(msg, ex);
    }

    public DataValidateException(Throwable ex) {
        super(ex);
    }
}
