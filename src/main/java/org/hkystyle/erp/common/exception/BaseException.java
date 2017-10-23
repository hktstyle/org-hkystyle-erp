
package org.hkystyle.erp.common.exception;

import java.io.PrintWriter;
import java.io.StringWriter;

/**
 * Created by hukaiyang on 2017/10/15.
 */
public class BaseException extends RuntimeException {
    private static final long serialVersionUID = 1L;
    private Throwable cause;

    public static String getStackTraceAsString(Exception e) {
        StringWriter stringWriter = new StringWriter();
        e.printStackTrace(new PrintWriter(stringWriter));
        return stringWriter.toString();
    }

    public BaseException() {
    }

    public BaseException(String msg) {
        super(msg);
    }

    public BaseException(String msg, Throwable ex) {
        super(msg, ex);
        this.cause = ex;
    }

    public BaseException(Throwable ex) {
        super(ex);
        this.cause = ex;
    }

    public Throwable getCause() {
        return (Throwable)(this.cause == null ? this : this.cause);
    }

    public String getErrorCode() {
        return super.getCause() != null ? super.getCause().getMessage() : "";
    }

    public String getErrorMessage() {
        return super.getMessage();
    }

    public String getMessage() {
        return super.getMessage();
    }

    protected String getOriginalMessage() {
        return super.getMessage();
    }

}
