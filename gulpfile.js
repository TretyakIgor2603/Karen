const gulp = require("gulp");
const del = require("del");

const SRC_PATH = "./build";
const DEST_PATH = "../back-end/agility_fw_platform/app/assets";

const jsPath = {
    src: `${SRC_PATH}/**/*.*`,
    dest: `${DEST_PATH}/javascripts/consumer_facing_react_app/build`
};
const cssPath = {
    src: `${SRC_PATH}/static/css/**/*.css`,
    dest: `${DEST_PATH}/stylesheets/consumer_facing_react_app`
};

gulp.task("deploy:js", () => {
    return gulp.src(jsPath.src)
        .pipe(gulp.dest(jsPath.dest));
});

gulp.task("del:js", () => del(jsPath.dest, { force: true }));

gulp.task("deploy:css", () => {
    return gulp.src(cssPath.src)
        .pipe(gulp.dest(cssPath.dest));
});

gulp.task("del:css", () => del(cssPath.dest, { force: true }));

const deployJS = gulp.series("del:js", "deploy:js");
const deployCSS = gulp.series("del:css", "deploy:css");

exports.default = gulp.parallel(deployJS, deployCSS);
