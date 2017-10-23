
package org.hkystyle.erp.common.exception;

/**
 * Created by hukaiyang on 2017/10/15.
 */
public class BusinessException extends BaseException {
    private static final long serialVersionUID = 1L;

    public BusinessException() {
    }

    public BusinessException(String msg) {
        super(msg);
    }

    public BusinessException(String errorMessage, String errorCode) {
        super(errorMessage, new Throwable(errorCode));
    }

    public BusinessException(String msg, Throwable ex) {
        super(msg, ex);
    }

    public BusinessException(Throwable ex) {
        super(ex);
    }
}