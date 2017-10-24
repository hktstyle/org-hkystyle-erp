/**
 * Copyright © 2017 hkystyle. All rights reserved.
 */
package org.hkystyle.erp.common.exception;

/**
 * Created by hukaiyang on 2017/10/15.
 */

public class BusinessValidateException extends BusinessException {
    private static final long serialVersionUID = 1L;

    public BusinessValidateException() {
    }

    public BusinessValidateException(String msg) {
        super(msg);
    }

    public BusinessValidateException(String msg, Throwable ex) {
        super(msg, ex);
    }

    public BusinessValidateException(Throwable ex) {
        super(ex);
    }

    public String getMessage() {
        return super.getOriginalMessage();
    }
}
