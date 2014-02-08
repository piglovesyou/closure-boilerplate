#######################################################################
#
#
#
#######################################################################

USAGE_TEXT="\n
    ---- Usage ---- \n\n\
    setup
    setup_plovr
    setup_closurelibrary
    setup_closurestylesheets
    setup_closuretemplates
    cleanup_lib
    soyweb
    serve
    build
    extract_msg
        \n"

LIBS_DIR=libs/

PLOVR_DIR=${LIBS_DIR}plovr/
PLOVR_REMOTE_DIR=http://plovr.googlecode.com/files/
PLOVR_JAR=plovr-81ed862.jar
PLOVR_JAR_PATH=${PLOVR_DIR}${PLOVR_JAR}

CLOSURELIBRARY_DIR=${LIBS_DIR}closure-library/
CLOSURELIBRARY_REMOTE_DIR=http://closure-library.googlecode.com/svn/trunk/

CLOSURESTYLESHEETS_JAR=closure-stylesheets-20111230.jar
CLOSURESTYLESHEETS_DIR=${LIBS_DIR}closure-stylesheets/
CLOSURESTYLESHEETS_REMOTE_DIR=https://closure-stylesheets.googlecode.com/files/
CLOSURESTYLESHEETS_JAR_PATH=${CLOSURESTYLESHEETS_DIR}${CLOSURESTYLESHEETS_JAR}

CLOSURETEMPLATES_DIR=${LIBS_DIR}closure-template/
CLOSURETEMPLATES_REMOTE_DIR=http://closure-templates.googlecode.com/files/
CLOSURETEMPLATES_FOR_JAVA=closure-templates-for-java-latest.zip
CLOSURETEMPLATES_FOR_JS=closure-templates-for-javascript-latest.zip
CLOSURETEMPLATES_MSG_EXTRACTOR=closure-templates-msg-extractor-latest.zip



cleanup_lib() {
    mkdir ${LIBS_DIR} > /dev/null 2>&1
}

setup_plovr() {
    rm -rf ${PLOVR_DIR}
    wget -P ${PLOVR_DIR} ${PLOVR_REMOTE_DIR}${PLOVR_JAR}
}

setup_closurelibrary() {
    rm -rf ${CLOSURELIBRARY_DIR}
    (cd ${LIBS_DIR} && svn co ${CLOSURELIBRARY_REMOTE_DIR} closure-library)
}

setup_closurestylesheets() {
    rm -rf ${CLOSURESTYLESHEETS_DIR}
    wget -P ${CLOSURESTYLESHEETS_DIR} --no-check-certificate ${CLOSURESTYLESHEETS_REMOTE_DIR}${CLOSURESTYLESHEETS_JAR}
}

setup_closuretemplates() {
    rm -rf ${CLOSURETEMPLATES_DIR}
    wget -P ${CLOSURETEMPLATES_DIR} ${CLOSURETEMPLATES_REMOTE_DIR}${CLOSURETEMPLATES_FOR_JAVA}
    unzip -d ${CLOSURETEMPLATES_DIR}java ${CLOSURETEMPLATES_DIR}${CLOSURETEMPLATES_FOR_JAVA}
    wget -P ${CLOSURETEMPLATES_DIR} ${CLOSURETEMPLATES_REMOTE_DIR}${CLOSURETEMPLATES_FOR_JS}
    unzip -d ${CLOSURETEMPLATES_DIR}js ${CLOSURETEMPLATES_DIR}${CLOSURETEMPLATES_FOR_JS}
    wget -P ${CLOSURETEMPLATES_DIR} ${CLOSURETEMPLATES_REMOTE_DIR}${CLOSURETEMPLATES_MSG_EXTRACTOR}
    unzip -d ${CLOSURETEMPLATES_DIR}msg ${CLOSURETEMPLATES_DIR}${CLOSURETEMPLATES_MSG_EXTRACTOR}
}

extract_msg() {
    java -jar \
        ${SOY_MSG_EXTRACTOR_DIR}${SOY_MSG_EXTRACTOR_JAR} \
        --outputFile extracted.xlf \
        $(find "public/app/soy/" -name "*.soy")
    [ $? -eq 0 ] && echo "extracted.xlf created"
}



case $1 in

    setup)
        cleanup_lib
        setup_plovr
        setup_closurelibrary
        setup_closurestylesheets
        setup_closuretemplates
        ;;

    cleanup_lib) cleanup_lib;;

    setup_plovr) setup_plovr;;

    setup_closurelibrary) setup_closurelibrary;;

    setup_closurestylesheets) setup_closurestylesheets;;

    setup_closuretemplates) setup_closuretemplates;;

    soyweb) java -jar ${PLOVR_JAR_PATH} soyweb --dir ./public;;

    serve) java -jar ${PLOVR_JAR_PATH} serve plovr.json;;

    build) java -jar ${PLOVR_JAR_PATH} build plovr.json;;

    extract_msg) extract_msg;;

    *) echo -e $USAGE_TEXT;;

esac

