/**
 * Copyright © 2017 hkystyle. All rights reserved.
 */
package org.hkystyle.erp.common.utils;

import org.hkystyle.erp.common.exception.DataValidateException;
import org.springframework.util.CollectionUtils;
import org.springframework.util.ObjectUtils;
import org.springframework.util.StringUtils;

import java.util.Collection;
import java.util.Map;

/**
 * Created by hukaiyang on 2017/10/24.
 */
public class AssertUtils {
    private AssertUtils() {
    }

    public static void isTrue(boolean expression, String message) {
        if (!expression) {
            fail(message);
        }

    }

    public static void isTrue(boolean expression) {
        isTrue(expression, "[断言失败] -这个表达式必须是true");
    }

    public static void isNull(Object object, String message) {
        if (object != null) {
            fail(message);
        }

    }

    public static void isNull(Object object) {
        isNull(object, "[断言失败] -对象参数必须为Null");
    }

    public static void notNull(Object object, String message) {
        if (object == null) {
            fail(message);
        }

    }

    public static void notNull(Object object) {
        notNull(object, "[断言失败] -此参数是必需的；它不能为Null");
    }

    public static void hasLength(String text, String message) {
        if (!StringUtils.hasLength(text)) {
            fail(message);
        }

    }

    public static void hasLength(String text) {
        hasLength(text, "[断言失败] -此字符串参数必须有长度，它不能为Null或空");
    }

    public static void hasText(String text, String message) {
        if (!StringUtils.hasText(text)) {
            fail(message);
        }

    }

    public static void hasText(String text) {
        hasText(text, "[断言失败] -此字符串参数必须有文本，它不能为Null或空");
    }

    public static void doesNotContain(String textToSearch, String substring, String message) {
        if (StringUtils.hasLength(textToSearch) && StringUtils.hasLength(substring) && textToSearch.contains(substring)) {
            fail(message);
        }

    }

    public static void doesNotContain(String textToSearch, String substring) {
        doesNotContain(textToSearch, substring, "[断言失败]这个字符串不能包含子字符串 [" + substring + "]");
    }

    public static void notEmpty(Object[] array, String message) {
        if (ObjectUtils.isEmpty(array)) {
            fail(message);
        }

    }

    public static void notEmpty(Object[] array) {
        notEmpty(array, "[断言失败] -这个数组不能是空的：它必须包含至少1个元素");
    }

    public static void noNullElements(Object[] array, String message) {
        if (array != null) {
            Object[] var2 = array;
            int var3 = array.length;

            for(int var4 = 0; var4 < var3; ++var4) {
                Object element = var2[var4];
                if (element == null) {
                    fail(message);
                }
            }
        }

    }

    public static void noNullElements(Object[] array) {
        noNullElements(array, "[断言失败] -此数组必须不包含任何空元素");
    }

    public static void notEmpty(Collection<?> collection, String message) {
        if (CollectionUtils.isEmpty(collection)) {
            fail(message);
        }

    }

    public static void notEmpty(Collection<?> collection) {
        notEmpty(collection, "[断言失败] -此集合必须不是空的：它必须包含至少1个元素");
    }

    public static void notEmpty(Map<?, ?> map, String message) {
        if (CollectionUtils.isEmpty(map)) {
            fail(message);
        }

    }

    public static void notEmpty(Map<?, ?> map) {
        notEmpty(map, "[断言失败] -此映射不能为空，它必须至少包含一个entry");
    }

    public static void isInstanceOf(Class<?> clazz, Object obj) {
        isInstanceOf(clazz, obj, "");
    }

    public static void isInstanceOf(Class<?> type, Object obj, String message) {
        notNull(type, "类型必须不为Null");
        if (!type.isInstance(obj)) {
            fail((StringUtils.hasLength(message) ? message + " " : "") + "Object of class [" + (obj != null ? obj.getClass().getName() : "null") + "] must be an instance of " + type);
        }

    }

    public static void isAssignable(Class<?> superType, Class<?> subType) {
        isAssignable(superType, subType, "");
    }

    public static void isAssignable(Class<?> superType, Class<?> subType, String message) {
        notNull(superType, "类型必须不为Null");
        if (subType == null || !superType.isAssignableFrom(subType)) {
            fail((StringUtils.hasLength(message) ? message + " " : "") + subType + " is not assignable to " + superType);
        }

    }

    public static void state(boolean expression, String message) {
        if (!expression) {
            fail(message);
        }

    }

    public static void state(boolean expression) {
        state(expression, "[断言失败] -这个状态不变必须是true");
    }

    public static void fail(String message) {
        if (message == null) {
            throw new DataValidateException();
        } else {
            throw new DataValidateException(message);
        }
    }
}
